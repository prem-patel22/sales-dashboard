'use client';

import { useWebSocket } from '@/hooks/useWebSocket';

export default function RealTimeIndicator() {
  const { data, isConnected } = useWebSocket('ws://localhost:3002');

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${
        isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
      }`} />
      <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
        {isConnected ? 'Live' : 'Offline'}
      </span>
      {data && (
        <span className="text-blue-600 text-xs">
          Last update: {new Date(data.timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}