import React from "react";

const discoverItems = [
  { title: "UAV Training", img: "/image/public-safety-video.jpg" },
  { title: "DJI Care", img: "/image/public-safety-video.jpg" },
  { title: "Fly Safe", img: "/image/public-safety-video.jpg" },
  { title: "Learning Center", img: "/image/public-safety-video.jpg" },
];

const DiscoverSection: React.FC = () => {
  return (
    <section id="discover" className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoverItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <a href="#" className="text-blue-500">
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
