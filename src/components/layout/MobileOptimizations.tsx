'use client';

import { useEffect } from 'react';

export default function MobileOptimizations() {
  useEffect(() => {
    // Prevent zoom on input focus for mobile
    const preventZoom = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);

  return null;
}