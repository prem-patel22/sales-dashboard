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
import { useDebounce } from '@/hooks/useDebounce'; // ✅ ensure you have this hook in /src/hooks/useDebounce.ts

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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'sales') return [value.toLocaleString(), 'Sales'];
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#0088FE" name="Sales" />
              <Bar dataKey="revenue" fill="#00C49F" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'sales') return [value.toLocaleString(), 'Sales'];
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  return [value, name];
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#0088FE" name="Sales" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" name="Revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Sales Dashboard - {year}</h2>
        <div className="text-sm text-gray-500">
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
        <div className="mt-4 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Records: {filteredData.length} of {data.length}</p>
          </div>
          <div>
            <p className="font-semibold">Total Sales: {filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Total Revenue: ${filteredData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
