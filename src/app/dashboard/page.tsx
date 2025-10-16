'use client'

import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import RealTimeIndicator from '@/components/ui/RealTimeIndicator'
import SalesChart from '@/components/charts/SalesChart'
import DashboardOverview from '@/components/charts/DashboardOverview'
import Card from '@/components/ui/Card'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import AnalyticsOverview from '@/components/charts/AnalyticsOverview';
import ExportData from '@/components/charts/ExportData';

// Header Section (with Theme Toggle + Real-Time Indicator)
const DashboardHeader = ({
  selectedYear,
  setSelectedYear,
}: {
  selectedYear: number
  setSelectedYear: (year: number) => void
}) => (
  <div className="mb-8">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sales Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive sales data visualization with real-time updates
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <RealTimeIndicator />
        <ThemeToggle />
      </div>
    </div>

    {/* Year Selector */}
    <div className="flex space-x-4 mt-6">
      {[2024, 2023, 2022].map((year) => (
        <button
          key={year}
          onClick={() => setSelectedYear(year)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            selectedYear === year
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
          }`}
        >
          {year} Sales
        </button>
      ))}
    </div>
  </div>
)

// Main Dashboard Page
export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2024)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <DashboardHeader
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Current Year</h3>
            <p className="text-2xl font-bold">{selectedYear}</p>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Data Points</h3>
            <p className="text-2xl font-bold">12 Months</p>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Chart Types</h3>
            <p className="text-2xl font-bold">3 Available</p>
          </Card>
        </div>

        {/* Main Sales Chart */}
        <Card className="mb-8">
          <SalesChart year={selectedYear} />
        </Card>

        {/* Additional Overview Charts */}
        <DashboardOverview year={selectedYear} />

        {/* Features Showcase */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Chart Types</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Switch between Bar, Line, and Pie charts for different perspectives
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 dark:text-green-300 text-xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Filtering</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Filter by sales threshold, region, and product category
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 dark:text-purple-300 text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600 dark:text-gray-400">
              API integration with simulated real-time data fetching
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
