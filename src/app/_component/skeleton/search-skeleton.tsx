const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden shadow-md bg-white flex flex-col">
      <div className="w-full aspect-[4/3] bg-gray-200" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="mt-4 h-10 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
