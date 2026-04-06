'use client';

import { Skeleton } from '@mui/material';

type ProductListSkeletonProps = {
  count?: number;
  showHeader?: boolean;
  showFilterBar?: boolean;
  className?: string;
};

export default function ProductListSkeleton({
  count = 8,
  showHeader = true,
  showFilterBar = true,
  className = '',
}: ProductListSkeletonProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen ${className}`}>
      {showHeader && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-12 text-center">
            <Skeleton variant="text" height={44} className="mx-auto w-2/3" />
            <Skeleton variant="text" height={28} className="mx-auto mt-3 w-1/2" />
          </div>
        </div>
      )}

      <section className="py-8">
        <div className="container mx-auto px-4">
          {showFilterBar && (
            <div className="mb-6 flex gap-3 overflow-x-auto">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="rounded" width={120} height={36} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden animate-pulse"
              >
                <Skeleton variant="rectangular" height={180} />

                <div className="p-4 space-y-2">
                  <Skeleton variant="text" height={20} width="80%" />

                  <Skeleton variant="text" height={14} width="100%" />
                  <Skeleton variant="text" height={14} width="90%" />
                  <Skeleton variant="text" height={14} width="70%" />

                  <Skeleton variant="rounded" height={36} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
