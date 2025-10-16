'use client';

interface FilterInputProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export default function FilterInput({ threshold, onThresholdChange }: FilterInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-2">
        Sales Threshold Filter
      </label>
      <input
        id="threshold"
        type="number"
        value={threshold}
        onChange={(e) => onThresholdChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter sales threshold"
        min="0"
      />
      <p className="text-xs text-gray-500 mt-1">
        Only show months with sales above this value
      </p>
    </div>
  );
}