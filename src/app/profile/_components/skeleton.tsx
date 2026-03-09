'use client';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  '&.dark': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const UserProfileSkeleton = () => {
  return (
    <main className="max-w-4xl w-full mx-auto px-4 py-10 space-y-10 flex flex-col dark:bg-gray-900">
      <section className="p-6 border rounded-lg shadow-sm w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
        <Skeleton
          variant="text"
          width={200}
          height={32}
          className="dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="text"
          width={300}
          height={24}
          className="mt-2 dark:bg-gray-700 dark:bg-opacity-50"
        />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
        <Skeleton
          variant="text"
          width={180}
          height={28}
          className="dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={56}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={40}
          width={120}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
        <Skeleton
          variant="text"
          width={180}
          height={28}
          className="dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={56}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={56}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={56}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
        <Skeleton
          variant="rectangular"
          height={40}
          width={160}
          className="rounded dark:bg-gray-700 dark:bg-opacity-50"
        />
      </section>

      <section className="p-6 border rounded-lg shadow-sm w-full space-y-4 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
        <Skeleton
          variant="text"
          width={220}
          height={28}
          className="dark:bg-gray-700 dark:bg-opacity-50"
        />
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton
              variant="text"
              height={20}
              width="80%"
              className="dark:bg-gray-700 dark:bg-opacity-50"
            />
            <Skeleton
              variant="text"
              height={20}
              width="60%"
              className="dark:bg-gray-700 dark:bg-opacity-50"
            />
            <Skeleton
              variant="text"
              height={20}
              width="40%"
              className="dark:bg-gray-700 dark:bg-opacity-50"
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default UserProfileSkeleton;
