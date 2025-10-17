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
  const [data, setData] = useState<ApiSalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Debounced filter values
  const debouncedThreshold = useDebounce(threshold, 300);
  const debouncedRegion = useDebounce(region, 300);
  const debouncedProduct = useDebounce(product, 300);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiData = await fetchSalesData(year);
        setData(apiData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  // Apply filters with debounced values
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const meetsThreshold = item.sales >= debouncedThreshold;
      const matchesRegion = debouncedRegion === 'All' || item.region === debouncedRegion;
      const matchesProduct = debouncedProduct === 'All' || item.product === debouncedProduct;
      return meetsThreshold && matchesRegion && matchesProduct;
    });
  }, [data, debouncedThreshold, debouncedRegion, debouncedProduct]);

  const pieData = useMemo(() => {
    return filteredData.map(item => ({
      name: item.month,
      value: item.sales,
    }));
  }, [filteredData]);

  const renderChart = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
    if (filteredData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data available for the selected filters. Try adjusting your criteria.
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
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
              <Bar dataKey="sales" fill="#0088FE" name="Sales" />
              <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
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
              <Line type="monotone" dataKey="sales" stroke="#0088FE" name="Sales" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" name="Revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Sales Dashboard - {year}</h2>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {loading ? 'Loading...' : `${filteredData.length} records`}
        </div>
      </div>

      <AdvancedFilters
        region={region}
        product={product}
        onRegionChange={setRegion}
        onProductChange={setProduct}
      />

      <ChartSwitcher chartType={chartType} onChartTypeChange={setChartType} />
      <FilterInput threshold={threshold} onThresholdChange={setThreshold} />

      {renderChart()}

      {!loading && !error && filteredData.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex justify-between">
            <span className="font-semibold text-xs">Records:</span>
            <span className="text-xs">{filteredData.length} of {data.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-xs">Total Sales:</span>
            <span className="text-xs">{filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-xs">Total Revenue:</span>
            <span className="text-xs">${filteredData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}