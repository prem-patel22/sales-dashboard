'use client';

interface AdvancedFiltersProps {
  region: string;
  product: string;
  onRegionChange: (region: string) => void;
  onProductChange: (product: string) => void;
}

export default function AdvancedFilters({ 
  region, 
  product, 
  onRegionChange, 
  onProductChange 
}: AdvancedFiltersProps) {
  const regions = ['All', 'North', 'South', 'East', 'West'];
  const products = ['All', 'Electronics', 'Furniture', 'Clothing'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Region
        </label>
        <select
          id="region"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Product
        </label>
        <select
          id="product"
          value={product}
          onChange={(e) => onProductChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {products.map(product => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}