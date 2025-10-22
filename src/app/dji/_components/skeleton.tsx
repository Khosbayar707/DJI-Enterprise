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
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      {showHeader && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-10 sm:py-16 text-center">
            <div className="mx-auto max-w-3xl">
              <Skeleton
                variant="text"
                sx={{ bgcolor: 'rgba(255,255,255,0.35)' }}
                height={44}
                className="mx-auto w-3/4 sm:w-2/3 rounded"
              />
              <Skeleton
                variant="text"
                sx={{ bgcolor: 'rgba(255,255,255,0.25)' }}
                height={28}
                className="mx-auto mt-3 w-5/6 sm:w-2/3 rounded"
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-3 sm:px-4">
          {showFilterBar && (
            <div className="sticky top-0 z-20 -mx-3 sm:mx-0 mb-4 sm:mb-6 bg-gray-50/80 sm:bg-transparent supports-[backdrop-filter]:backdrop-blur px-3 sm:px-0 py-2 sm:py-0 border-b sm:border-0">
              <div className="max-w-7xl mx-auto overflow-x-auto sm:overflow-visible scrollbar-hide">
                <div className="flex min-w-max gap-2 sm:gap-3 py-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={36}
                      className="w-24 sm:w-28 md:w-32"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className={`
              grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              gap-3 sm:gap-5 lg:gap-8
            `}
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="group rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.5s',
                  animationTimingFunction: 'ease-out',
                  animationDelay: `${i * 0.06}s`,
                  animationFillMode: 'both',
                }}
              >
                <div className="relative w-full overflow-hidden rounded-t-xl bg-white">
                  <div className="relative aspect-[4/3]">
                    <Skeleton variant="rectangular" className="absolute inset-0 h-full w-full" />
                    <div className="pointer-events-none absolute top-2 right-2">
                      <Skeleton variant="rounded" width={80} height={20} />
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <Skeleton variant="text" height={24} className="w-4/5" />
                  <div className="mt-2 space-y-2">
                    <Skeleton variant="text" height={16} className="w-full" />
                    <Skeleton variant="text" height={16} className="w-11/12" />
                    <Skeleton variant="text" height={16} className="w-9/12" />
                  </div>
                  <Skeleton variant="rounded" height={40} className="mt-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
