'use client';

import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface RegionalData {
  region: string;
  sales: number;
  revenue: number;
}

interface RegionalChartProps {
  data: RegionalData[];
  chartType: 'pie' | 'bar';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function RegionalChart({ data, chartType }: RegionalChartProps) {
  if (chartType === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ region, percent }) => `${region} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="sales"
            nameKey="region"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip formatter={(value) => [value.toLocaleString(), 'Sales']} />
        <Legend />
        <Bar dataKey="sales" fill="#0088FE" name="Sales" />
        <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  );
}