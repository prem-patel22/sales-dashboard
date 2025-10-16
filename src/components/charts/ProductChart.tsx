'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ProductData {
  product: string;
  sales: number;
  revenue: number;
}

interface ProductChartProps {
  data: ProductData[];
  chartType: 'bar' | 'line';
}

export default function ProductChart({ data, chartType }: ProductChartProps) {
  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#0088FE" name="Sales" />
          <Line type="monotone" dataKey="revenue" stroke="#00C49F" name="Revenue ($)" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
        <Legend />
        <Bar dataKey="sales" fill="#0088FE" name="Sales" />
        <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  );
}