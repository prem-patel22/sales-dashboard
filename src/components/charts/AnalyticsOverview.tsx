'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsOverviewProps {
  data: any[];
  year: number;
}

export default function AnalyticsOverview({ data, year }: AnalyticsOverviewProps) {
  const analytics = useMemo(() => {
    if (!data.length) return null;

    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalProfit = data.reduce((sum, item) => sum + (item.profit || 0), 0);
    const totalCustomers = data.reduce((sum, item) => sum + (item.customers || 0), 0);
    
    const averageSales = totalSales / data.length;
    const averageRevenue = totalRevenue / data.length;
    const growthRate = data.length > 1 
      ? ((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100 
      : 0;

    // Forecast next 3 months
    const lastMonths = data.slice(-3);
    const averageGrowth = lastMonths.length > 1 
      ? lastMonths.reduce((sum, item, index, arr) => {
          if (index === 0) return sum;
          return sum + ((item.sales - arr[index - 1].sales) / arr[index - 1].sales);
        }, 0) / (lastMonths.length - 1)
      : 0;

    const forecast = Array.from({ length: 3 }, (_, i) => {
      const lastData = data[data.length - 1];
      const forecastSales = lastData.sales * Math.pow(1 + averageGrowth, i + 1);
      return {
        month: `Forecast ${i + 1}`,
        sales: Math.round(forecastSales),
        type: 'forecast' as const
      };
    });

    return {
      totals: { sales: totalSales, revenue: totalRevenue, profit: totalProfit, customers: totalCustomers },
      averages: { sales: averageSales, revenue: averageRevenue },
      growthRate,
      forecast
    };
  }, [data]);

  if (!data.length || !analytics) return null;

  const chartData = [
    ...data.map(item => ({ ...item, type: 'actual' as const })),
    ...analytics.forecast
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <h3 className="text-sm font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">{analytics.totals.sales.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <h3 className="text-sm font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${analytics.totals.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <h3 className="text-sm font-semibold">Growth Rate</h3>
          <p className="text-2xl font-bold">{analytics.growthRate.toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <h3 className="text-sm font-semibold">Avg. Monthly</h3>
          <p className="text-2xl font-bold">{Math.round(analytics.averages.sales).toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Trend with Forecast */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Sales Trend & Forecast</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#0088FE" 
              name="Sales"
              strokeDasharray={chartData.filter(d => d.type === 'forecast').map((_, i, arr) => 
                i === arr.length - 1 ? "5 5" : "0"
              ).join(',')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}