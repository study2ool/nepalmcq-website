import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse w-full">
      {/* Top Banner Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-8 w-80 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 max-w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
          >
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
