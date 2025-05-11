import React from "react";

const industries = [
  { title: "Public Safety", img: "/image/public-safety-video.jpg" },
  { title: "Construction", img: "/image/public-safety-video.jpg" },
  { title: "Energy", img: "/image/public-safety-video.jpg" },
];

const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Industries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={industry.img}
                alt={industry.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{industry.title}</h3>
                <a href="#" className="text-blue-500">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
