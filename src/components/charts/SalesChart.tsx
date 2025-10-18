'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ApiSalesData, fetchSalesData } from '@/lib/api';
import ChartSwitcher from './ChartSwitcher';
import FilterInput from './FilterInput';
import AdvancedFilters from './AdvancedFilters';
import ComparativeFilters, { ComparisonFilters } from './ComparativeFilters';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';

interface SalesChartProps {
  year: number;
}

type ChartType = 'bar' | 'line' | 'pie';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function SalesChart({ year }: SalesChartProps) {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);
  const [region, setRegion] = useState<string>('All');
  const [product, setProduct] = useState<string>('All');
  const [allData, setAllData] = useState<ApiSalesData[]>([]); // Store data from all years
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonFilters, setComparisonFilters] = useState<ComparisonFilters>({
    period1: { year: 2024, month: 'Jun', region: 'All', product: 'All' },
    period2: { year: 2022, month: 'Jul', region: 'All', product: 'All' },
    enabled: false,
    useGlobalFilters: true
  });

  // ✅ Debounced filter values
  const debouncedThreshold = useDebounce(threshold, 300);
  const debouncedRegion = useDebounce(region, 300);
  const debouncedProduct = useDebounce(product, 300);

  // Fetch data from ALL years for comparison
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data for all years (2022, 2023, 2024)
        const years = [2022, 2023, 2024];
        const allDataPromises = years.map(year => fetchSalesData(year));
        const allYearData = await Promise.all(allDataPromises);
        
        // Combine all data into one array
        const combinedData = allYearData.flat();
        setAllData(combinedData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []); // Remove year dependency to load all data once

  // Filter data for the main chart (current selected year)
  const currentYearData = useMemo(() => {
    return allData.filter(item => item.year === year);
  }, [allData, year]);

  // Apply filters with debounced values for main chart
  const filteredData = useMemo(() => {
    return currentYearData.filter(item => {
      const meetsThreshold = item.sales >= debouncedThreshold;
      const matchesRegion = debouncedRegion === 'All' || item.region === debouncedRegion;
      const matchesProduct = debouncedProduct === 'All' || item.product === debouncedProduct;
      return meetsThreshold && matchesRegion && matchesProduct;
    });
  }, [currentYearData, debouncedThreshold, debouncedRegion, debouncedProduct]);

  // Get comparison data with proper filtering from ALL years
  const getComparisonData = useMemo(() => {
    if (!comparisonFilters.enabled) {
      return { 
        period1: [], 
        period2: [], 
        period1Total: 0, 
        period2Total: 0, 
        period1Revenue: 0, 
        period2Revenue: 0, 
        period1Records: 0,
        period2Records: 0,
        labels: [],
        difference: 0,
        growthPercentage: 0
      };
    }

    const getFilteredData = (period: any) => {
      return allData.filter(item => {
        const matchesYearMonth = item.year === period.year && item.month === period.month;
        
        if (comparisonFilters.useGlobalFilters) {
          // Use global filters
          const matchesRegion = debouncedRegion === 'All' || item.region === debouncedRegion;
          const matchesProduct = debouncedProduct === 'All' || item.product === debouncedProduct;
          return matchesYearMonth && matchesRegion && matchesProduct;
        } else {
          // Use period-specific filters
          const matchesRegion = period.region === 'All' || item.region === period.region;
          const matchesProduct = period.product === 'All' || item.product === period.product;
          return matchesYearMonth && matchesRegion && matchesProduct;
        }
      });
    };

    const period1Data = getFilteredData(comparisonFilters.period1);
    const period2Data = getFilteredData(comparisonFilters.period2);

    // Calculate totals for each period
    const period1Total = period1Data.reduce((sum, item) => sum + item.sales, 0);
    const period2Total = period2Data.reduce((sum, item) => sum + item.sales, 0);
    const period1Revenue = period1Data.reduce((sum, item) => sum + item.revenue, 0);
    const period2Revenue = period2Data.reduce((sum, item) => sum + item.revenue, 0);

    // Calculate difference and growth percentage
    const difference = period1Total - period2Total;
    const growthPercentage = period2Total > 0 ? (difference / period2Total) * 100 : 0;

    const label1 = `${comparisonFilters.period1.month} ${comparisonFilters.period1.year}`;
    const label2 = `${comparisonFilters.period2.month} ${comparisonFilters.period2.year}`;

    return {
      period1: period1Data,
      period2: period2Data,
      period1Total,
      period2Total,
      period1Revenue,
      period2Revenue,
      period1Records: period1Data.length,
      period2Records: period2Data.length,
      labels: [label1, label2],
      difference,
      growthPercentage
    };
  }, [allData, comparisonFilters, debouncedRegion, debouncedProduct]);

  const pieData = useMemo(() => {
    return filteredData.map(item => ({
      name: item.month,
      value: item.sales,
    }));
  }, [filteredData]);

  const renderChart = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
    
    const displayData = comparisonFilters.enabled ? getComparisonData : { 
      period1: filteredData, 
      period2: [],
      period1Total: filteredData.reduce((sum, item) => sum + item.sales, 0),
      period2Total: 0,
      period1Revenue: filteredData.reduce((sum, item) => sum + item.revenue, 0),
      period2Revenue: 0,
      period1Records: filteredData.length,
      period2Records: 0,
      labels: [],
      difference: 0,
      growthPercentage: 0
    };

    if (filteredData.length === 0 && !comparisonFilters.enabled) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data available for the selected filters. Try adjusting your criteria.
        </div>
      );
    }

    if (comparisonFilters.enabled && (displayData.period1Records === 0 || displayData.period2Records === 0)) {
      return (
        <div className="text-center py-8 text-yellow-600">
          {displayData.period1Records === 0 && displayData.period2Records === 0 ? (
            "No data available for both comparison periods with the current filters."
          ) : displayData.period1Records === 0 ? (
            `No data available for ${comparisonFilters.period1.month} ${comparisonFilters.period1.year} with the current filters.`
          ) : (
            `No data available for ${comparisonFilters.period2.month} ${comparisonFilters.period2.year} with the current filters.`
          )}
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <BarChart 
              data={comparisonFilters.enabled ? [
                {
                  name: displayData.labels[0],
                  sales: displayData.period1Total,
                  revenue: displayData.period1Revenue,
                  records: displayData.period1Records
                },
                {
                  name: displayData.labels[1],
                  sales: displayData.period2Total,
                  revenue: displayData.period2Revenue,
                  records: displayData.period2Records
                }
              ] : filteredData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={comparisonFilters.enabled ? "name" : "month"}
                angle={comparisonFilters.enabled ? 0 : -45}
                textAnchor={comparisonFilters.enabled ? "middle" : "end"}
                height={comparisonFilters.enabled ? 30 : 60}
                interval={0}
                fontSize={10}
              />
              <YAxis fontSize={10} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'sales') return [value.toLocaleString(), 'Sales'];
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  if (name === 'records') return [value, 'Records'];
                  return [value, name];
                }}
              />
              <Legend 
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#0088FE" 
                name="Sales" 
                fillOpacity={0.8}
              />
              <Bar 
                dataKey="revenue" 
                fill="#00C49F" 
                name="Revenue ($)" 
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <LineChart 
              data={comparisonFilters.enabled ? [
                {
                  name: displayData.labels[0],
                  sales: displayData.period1Total,
                  revenue: displayData.period1Revenue,
                },
                {
                  name: displayData.labels[1],
                  sales: displayData.period2Total,
                  revenue: displayData.period2Revenue,
                }
              ] : filteredData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={comparisonFilters.enabled ? "name" : "month"}
                fontSize={10}
              />
              <YAxis fontSize={10} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'sales') return [value.toLocaleString(), 'Sales'];
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  return [value, name];
                }}
              />
              <Legend 
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#0088FE" 
                name="Sales" 
                strokeWidth={3}
                strokeDasharray={comparisonFilters.enabled ? "5 5" : "0"}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#00C49F" 
                name="Revenue" 
                strokeWidth={3}
                strokeDasharray={comparisonFilters.enabled ? "5 5" : "0"}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        if (comparisonFilters.enabled) {
          return (
            <div className="text-center py-4">
              <p className="text-yellow-600 mb-4">
                Pie charts are not available for comparison mode. Please use Bar or Line charts.
              </p>
              <ResponsiveContainer width="100%" height={300} className="text-xs">
                <BarChart 
                  data={[
                    {
                      name: displayData.labels[0],
                      sales: displayData.period1Total,
                      revenue: displayData.period1Revenue,
                    },
                    {
                      name: displayData.labels[1],
                      sales: displayData.period2Total,
                      revenue: displayData.period2Revenue,
                    }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#0088FE" name="Sales" />
                  <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        }
        
        return (
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
              <Legend 
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Sales Dashboard {comparisonFilters.enabled ? '- Comparison Mode' : `- ${year}`}
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {loading ? 'Loading...' : comparisonFilters.enabled ? 
            `Comparing ${getComparisonData.period1Records + getComparisonData.period2Records} records` : 
            `${filteredData.length} records`
          }
        </div>
      </div>

      <AdvancedFilters
        region={region}
        product={product}
        onRegionChange={setRegion}
        onProductChange={setProduct}
      />

      {/* Comparative Analysis Feature */}
      <ComparativeFilters 
        onComparisonChange={setComparisonFilters}
        currentRegion={region}
        currentProduct={product}
        onRegionChange={setRegion}
        onProductChange={setProduct}
      />

      <ChartSwitcher chartType={chartType} onChartTypeChange={setChartType} />
      <FilterInput threshold={threshold} onThresholdChange={setThreshold} />

      {renderChart()}

      {!loading && !error && (filteredData.length > 0 || comparisonFilters.enabled) && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {comparisonFilters.enabled ? (
            <>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Comparison:</span>
                <span className="text-xs">
                  {comparisonFilters.period1.month} {comparisonFilters.period1.year} vs {comparisonFilters.period2.month} {comparisonFilters.period2.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Period 1 Sales:</span>
                <span className="text-xs">
                  {getComparisonData.period1Total.toLocaleString()} ({getComparisonData.period1Records} records)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Period 2 Sales:</span>
                <span className="text-xs">
                  {getComparisonData.period2Total.toLocaleString()} ({getComparisonData.period2Records} records)
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="font-semibold text-xs">Sales Difference:</span>
                <span className={`text-xs font-bold ${
                  getComparisonData.difference > 0 
                    ? 'text-green-600' 
                    : getComparisonData.difference < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {getComparisonData.difference > 0 ? '+' : ''}{getComparisonData.difference.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Growth Percentage:</span>
                <span className={`text-xs font-bold ${
                  getComparisonData.growthPercentage > 0 
                    ? 'text-green-600' 
                    : getComparisonData.growthPercentage < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {getComparisonData.growthPercentage > 0 ? '+' : ''}{getComparisonData.growthPercentage.toFixed(1)}%
                </span>
              </div>
              {!comparisonFilters.useGlobalFilters && (
                <>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="font-semibold text-xs">Period 1 Filters:</span>
                    <span className="text-xs">
                      {comparisonFilters.period1.region}, {comparisonFilters.period1.product}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-xs">Period 2 Filters:</span>
                    <span className="text-xs">
                      {comparisonFilters.period2.region}, {comparisonFilters.period2.product}
                    </span>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Records:</span>
                <span className="text-xs">{filteredData.length} of {currentYearData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Total Sales:</span>
                <span className="text-xs">{filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-xs">Total Revenue:</span>
                <span className="text-xs">${filteredData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}