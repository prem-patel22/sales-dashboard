'use client';

import Link from 'next/link';
import MobileOptimizations from '@/components/layout/MobileOptimizations';

export default function Home() {
  return (
    <>
      <MobileOptimizations />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
        <div className="text-center px-4 max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sales Analytics Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Modern sales tracking and visualization platform
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors inline-block w-full sm:w-auto text-sm sm:text-base"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}