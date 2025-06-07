'use client';
import { Skeleton } from '@mui/material';

const UserProfileSkeleton = () => {
  return (
    <main className="max-w-4xl w-full mx-auto px-4 py-10 space-y-10 flex flex-col">
      <section className="p-6 border rounded-lg shadow-sm w-full">
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="text" width={300} height={24} className="mt-2" />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4">
        <Skeleton variant="text" width={180} height={28} />
        <Skeleton variant="rectangular" height={56} className="rounded" />
        <Skeleton variant="rectangular" height={40} width={120} className="rounded" />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4">
        <Skeleton variant="text" width={180} height={28} />
        <Skeleton variant="rectangular" height={56} className="rounded" />
        <Skeleton variant="rectangular" height={56} className="rounded" />
        <Skeleton variant="rectangular" height={56} className="rounded" />
        <Skeleton variant="rectangular" height={40} width={160} className="rounded" />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4">
        <Skeleton variant="text" width={220} height={28} />
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton variant="text" height={20} width="80%" />
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="text" height={20} width="40%" />
          </div>
        ))}
      </section>
    </main>
  );
};

export default UserProfileSkeleton;
