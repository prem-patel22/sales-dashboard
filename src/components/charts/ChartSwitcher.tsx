'use client';

type ChartType = 'bar' | 'line' | 'pie';

interface ChartSwitcherProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

export default function ChartSwitcher({ chartType, onChartTypeChange }: ChartSwitcherProps) {
  const chartTypes: { type: ChartType; label: string }[] = [
    { type: 'bar', label: 'Bar Chart' },
    { type: 'line', label: 'Line Chart' },
    { type: 'pie', label: 'Pie Chart' },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {chartTypes.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => onChartTypeChange(type)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            chartType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}