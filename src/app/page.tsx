'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = () => {
    console.log('Navigating to dashboard...');
    // Use both methods for maximum compatibility
    router.push('/dashboard');
    // Fallback for mobile
    setTimeout(() => {
      if (window.location.pathname === '/') {
        window.location.href = '/dashboard';
      }
    }, 100);
  };

  // Direct navigation for maximum reliability
  const handleDirectNavigate = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-center px-4 max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sales Analytics Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Modern sales tracking and visualization platform
        </p>
        
        {/* Primary button with multiple event handlers */}
        <button
          onClick={handleNavigate}
          onTouchStart={handleNavigate} // Touch start instead of end
          onTouchEnd={(e) => e.preventDefault()} // Prevent default behavior
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors w-full text-lg min-h-[60px] active:scale-95 active:bg-blue-800 select-none"
          style={{
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
            touchAction: 'manipulation',
            cursor: 'pointer'
          }}
        >
          View Dashboard
        </button>

        {/* Debug info - remove in production */}
        <div className="mt-4 text-xs text-gray-500">
          Device: {isMobile ? 'Mobile' : 'Desktop'} | 
          Path: {typeof window !== 'undefined' ? window.location.pathname : ''}
        </div>

        {/* Fallback button - hidden but functional */}
        <a 
          href="/dashboard" 
          className="hidden" 
          id="fallback-link"
          aria-hidden="true"
        >
          Fallback Navigation
        </a>
      </div>

      {/* Emergency navigation script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Emergency navigation for mobile
            document.addEventListener('DOMContentLoaded', function() {
              const button = document.querySelector('button');
              const fallbackLink = document.getElementById('fallback-link');
              
              if (button) {
                // Add multiple event listeners
                button.addEventListener('click', function() {
                  console.log('Button clicked - attempting navigation');
                  window.location.href = '/dashboard';
                });
                
                button.addEventListener('touchend', function(e) {
                  e.preventDefault();
                  console.log('Touch end - attempting navigation');
                  window.location.href = '/dashboard';
                });
                
                // Double-tap protection
                let lastTap = 0;
                button.addEventListener('touchend', function(e) {
                  const currentTime = new Date().getTime();
                  const tapLength = currentTime - lastTap;
                  if (tapLength < 500 && tapLength > 0) {
                    e.preventDefault();
                    window.location.href = '/dashboard';
                  }
                  lastTap = currentTime;
                });
              }
            });
          `
        }}
      />
    </div>
  );
}