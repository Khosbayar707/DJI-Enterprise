import React from 'react';

const HeroSkeleton = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 bg-gray-700 animate-pulse" />

      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
        <div className="text-white max-w-2xl space-y-6">
          <div className="h-12 md:h-16 bg-gray-500 rounded w-3/4 animate-pulse" />
          <div className="h-6 md:h-8 bg-gray-500 rounded w-full animate-pulse" />
          <div className="h-6 md:h-8 bg-gray-500 rounded w-5/6 animate-pulse" />

          <div className="flex gap-4 mt-6">
            <div className="h-12 w-40 bg-gray-600 rounded-lg animate-pulse" />
            <div className="h-12 w-40 bg-gray-600 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
