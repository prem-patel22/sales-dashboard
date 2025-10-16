'use client';

import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection
    const connect = () => {
      // In a real app, this would be a proper WebSocket connection
      console.log('Simulating WebSocket connection to:', url);
      setIsConnected(true);
      
      // Simulate receiving updates every 30 seconds
      const interval = setInterval(() => {
        setData({
          type: 'update',
          timestamp: new Date().toISOString(),
          message: 'Data refreshed',
          newSales: Math.floor(Math.random() * 1000)
        });
      }, 30000);

      return () => clearInterval(interval);
    };

    const cleanup = connect();

    return () => {
      cleanup();
      setIsConnected(false);
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { data, isConnected, sendMessage };
}