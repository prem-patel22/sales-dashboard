'use client';

type ChartType = 'bar' | 'line' | 'pie';

interface ChartSwitcherProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

export default function ChartSwitcher({ chartType, onChartTypeChange }: ChartSwitcherProps) {
  const chartTypes: { type: ChartType; label: string }[] = [
    { type: 'bar', label: 'Bar' }, // Shorter labels for mobile
    { type: 'line', label: 'Line' },
    { type: 'pie', label: 'Pie' },
  ];

  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {chartTypes.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => onChartTypeChange(type)}
          className={`px-3 py-2 rounded-md text-xs font-medium transition-colors flex-1 min-w-[60px] ${
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