import React from "react";
import { motion } from "framer-motion";

const industries = [
  {
    title: "Public Safety",
    img: "/image/public-safety-video.jpg",
    desc: "Better serve your communities with accurate and timely aerial intel.",
  },
  {
    title: "Construction",
    img: "/image/public-safety-video.jpg",
    desc: "Optimize your projects with advanced aerial insights.",
  },
  {
    title: "Energy",
    img: "/image/public-safety-video.jpg",
    desc: "Enhance efficiency with precise aerial monitoring.",
  },
];

const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Industries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="relative rounded-none overflow-hidden shadow-lg h-[345px]"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={industry.img}
                alt={industry.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-4 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {industry.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{industry.desc}</p>
                <motion.a
                  href="#"
                  className="text-blue-500 underline"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
