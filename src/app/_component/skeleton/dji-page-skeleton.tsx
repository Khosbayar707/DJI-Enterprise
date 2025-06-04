export default function DroneDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 animate-pulse font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="h-[200px] bg-gray-300 rounded-lg w-full" />
          <div className="space-y-6">
            <div className="h-10 bg-gray-300 rounded w-2/3" />
            <div className="h-6 bg-gray-300 rounded w-full" />
            <div className="h-6 bg-gray-300 rounded w-5/6" />
            <div className="h-6 bg-gray-300 rounded w-4/5" />

            <div className="flex gap-4 mt-6">
              <div className="h-12 w-40 bg-gray-300 rounded-lg" />
              <div className="h-12 w-40 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-1/4 bg-gray-300 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
        <div className="h-80 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
