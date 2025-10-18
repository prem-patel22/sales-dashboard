'use client';

import { useState } from 'react';

interface ComparativeFilterProps {
  onComparisonChange: (filters: ComparisonFilters) => void;
  currentRegion: string;
  currentProduct: string;
  onRegionChange: (region: string) => void;
  onProductChange: (product: string) => void;
}

export interface ComparisonFilters {
  period1: { year: number; month: string; region: string; product: string };
  period2: { year: number; month: string; region: string; product: string };
  enabled: boolean;
  useGlobalFilters: boolean;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const regions = ['All', 'North', 'South', 'East', 'West'];
const products = ['All', 'Electronics', 'Furniture', 'Clothing'];

export default function ComparativeFilters({ 
  onComparisonChange, 
  currentRegion, 
  currentProduct, 
  onRegionChange, 
  onProductChange 
}: ComparativeFilterProps) {
  const [filters, setFilters] = useState<ComparisonFilters>({
    period1: { year: 2024, month: 'Jun', region: 'All', product: 'All' },
    period2: { year: 2022, month: 'Jul', region: 'All', product: 'All' },
    enabled: false,
    useGlobalFilters: true
  });

  const updateFilter = (key: keyof ComparisonFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onComparisonChange(newFilters);
  };

  const updatePeriodFilter = (period: 'period1' | 'period2', field: string, value: any) => {
    const newFilters = {
      ...filters,
      [period]: { ...filters[period], [field]: value }
    };
    setFilters(newFilters);
    onComparisonChange(newFilters);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          📊 Compare Time Periods
        </h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.enabled}
            onChange={(e) => updateFilter('enabled', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Comparison
          </span>
        </label>
      </div>

      {filters.enabled && (
        <>
          {/* Global Filters Toggle */}
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.useGlobalFilters}
                onChange={(e) => updateFilter('useGlobalFilters', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Use main filters for comparison
              </span>
            </label>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
              When enabled, uses the main region and product filters. When disabled, you can set different filters for each period.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Period 1 */}
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">First Period</h4>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <select
                      value={filters.period1.year}
                      onChange={(e) => updatePeriodFilter('period1', 'year', Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {[2022, 2023, 2024].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                    <select
                      value={filters.period1.month}
                      onChange={(e) => updatePeriodFilter('period1', 'month', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!filters.useGlobalFilters && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
                      <select
                        value={filters.period1.region}
                        onChange={(e) => updatePeriodFilter('period1', 'region', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label>
                      <select
                        value={filters.period1.product}
                        onChange={(e) => updatePeriodFilter('period1', 'product', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        {products.map(product => (
                          <option key={product} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Period 2 */}
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Second Period</h4>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <select
                      value={filters.period2.year}
                      onChange={(e) => updatePeriodFilter('period2', 'year', Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {[2022, 2023, 2024].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                    <select
                      value={filters.period2.month}
                      onChange={(e) => updatePeriodFilter('period2', 'month', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!filters.useGlobalFilters && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
                      <select
                        value={filters.period2.region}
                        onChange={(e) => updatePeriodFilter('period2', 'region', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label>
                      <select
                        value={filters.period2.product}
                        onChange={(e) => updatePeriodFilter('period2', 'product', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        {products.map(product => (
                          <option key={product} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {filters.enabled && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 <strong>Comparing:</strong> {filters.period1.month} {filters.period1.year} 
            {!filters.useGlobalFilters && ` (${filters.period1.region}, ${filters.period1.product})`}
            {' vs '}
            {filters.period2.month} {filters.period2.year}
            {!filters.useGlobalFilters && ` (${filters.period2.region}, ${filters.period2.product})`}
            {filters.useGlobalFilters && ' (using main filters)'}
          </p>
        </div>
      )}
    </div>
  );
}