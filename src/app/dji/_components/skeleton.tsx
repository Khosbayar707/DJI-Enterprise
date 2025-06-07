'use client';
import { Skeleton } from '@mui/material';

const ProductListSkeleton = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded shadow-sm space-y-4">
                <Skeleton variant="rectangular" height={180} className="rounded w-full" />
                <Skeleton variant="text" height={28} width="80%" />
                <Skeleton variant="text" height={24} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListSkeleton;
