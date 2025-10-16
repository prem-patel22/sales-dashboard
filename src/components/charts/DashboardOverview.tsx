'use client';

import { useState, useEffect } from 'react';
import { fetchSalesByRegion, fetchSalesByProduct } from '@/lib/api';
import RegionalChart from './RegionalChart';
import ProductChart from './ProductChart';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

interface DashboardOverviewProps {
  year: number;
}

export default function DashboardOverview({ year }: DashboardOverviewProps) {
  const [regionalData, setRegionalData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [regionalChartType, setRegionalChartType] = useState<'pie' | 'bar'>('pie');
  const [productChartType, setProductChartType] = useState<'bar' | 'line'>('bar');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [regionData, productData] = await Promise.all([
          fetchSalesByRegion(year),
          fetchSalesByProduct(year)
        ]);
        setRegionalData(regionData);
        setProductData(productData);
      } catch (error) {
        console.error('Error loading overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Regional Sales */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales by Region</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setRegionalChartType('pie')}
              className={`px-3 py-1 text-sm rounded ${
                regionalChartType === 'pie' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pie Chart
            </button>
            <button
              onClick={() => setRegionalChartType('bar')}
              className={`px-3 py-1 text-sm rounded ${
                regionalChartType === 'bar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>
        <RegionalChart data={regionalData} chartType={regionalChartType} />
      </Card>

      {/* Product Sales */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales by Product</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setProductChartType('bar')}
              className={`px-3 py-1 text-sm rounded ${
                productChartType === 'bar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setProductChartType('line')}
              className={`px-3 py-1 text-sm rounded ${
                productChartType === 'line' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Line Chart
            </button>
          </div>
        </div>
        <ProductChart data={productData} chartType={productChartType} />
      </Card>
    </div>
  );
}