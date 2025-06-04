export default function DroneShowcaseSkeleton() {
  return (
    <div className="animate-pulse space-y-24 py-10">
      <section className="relative h-screen w-full overflow-hidden bg-black animate-pulse">
        <div className="absolute inset-0 bg-gray-800" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-black/50 text-white">
          <div className="h-12 md:h-16 w-2/3 md:w-1/3 bg-gray-600 rounded mb-6" />
          <div className="h-6 w-3/4 md:w-1/2 bg-gray-500 rounded" />
        </div>
      </section>
      <section className="container mx-auto px-4 space-y-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="h-32 bg-gray-700 rounded" />
        ))}
      </section>
      <section className="container mx-auto px-4 space-y-12">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-gray-700 rounded" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-gray-600 rounded" />
              <div className="h-6 w-5/6 bg-gray-600 rounded" />
              <div className="h-6 w-2/3 bg-gray-600 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
