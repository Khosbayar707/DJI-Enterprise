import React from "react";

const caseStudies = [
  { title: "Public Safety", img: "/image/public-safety-video.jpg" },
  { title: "UAV Technology", img: "/image/public-safety-video.jpg" },
  { title: "Volcanic Eruptions", img: "/image/public-safety-video.jpg" },
];

const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Case Study Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={study.img}
                alt={study.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{study.title}</h3>
                <a href="#" className="text-blue-500">
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
