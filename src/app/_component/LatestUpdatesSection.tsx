import React from "react";

const updates = [
  { title: "DJI Dock 2", img: "/images/dji-dock-2.jpg" },
  { title: "DJI Matrix 4", img: "/images/dji-matrix-4.jpg" },
  { title: "Public Safety", img: "/images/public-safety-update.jpg" },
  { title: "Stockpile", img: "/images/stockpile.jpg" },
];

const LatestUpdatesSection: React.FC = () => {
  return (
    <section id="updates" className="py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {updates.map((update, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={update.img}
                alt={update.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{update.title}</h3>
                <a href="#" className="text-blue-500">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdatesSection;
