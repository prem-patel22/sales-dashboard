'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeDebug() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed top-4 left-4 z-50 p-2 bg-black text-white text-xs">
      Current theme: {theme}
    </div>
  );
}