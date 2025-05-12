import React from "react";
import { motion } from "framer-motion";
import Card from "@/app/_component/Card";

const matrice4Data = [
  {
    title: "Public Safety",
    img: "/images/matrice-4t-public-safety.jpg",
    desc: "Utilize the Matrice 4T’s thermal imaging and 112x zoom for firefighting, search, and rescue operations.",
  },
  {
    title: "Construction & Mining",
    img: "/images/matrice-4e-construction.jpg",
    desc: "Leverage the Matrice 4E’s 5-directional oblique capture for efficient mapping and 3D modeling.",
  },
  {
    title: "Energy",
    img: "/images/matrice-4t-energy.jpg",
    desc: "Inspect power lines and bridges with the 70mm telephoto lens from 10 meters using Matrice 4T.",
  },
];

const Page = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          DJI Matrice 4 Series - The Age of Intelligent Flight
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          A new compact and intelligent multi-sensor flagship drone series for
          enterprise industries, featuring Matrice 4T and Matrice 4E with
          AI-powered detection and laser range finding.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Advanced AI Detection
              </h3>
              <p className="text-gray-600">
                Real-time detection of humans, vehicles, and boats with enhanced
                sensing.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                49-Min Flight Time
              </h3>
              <p className="text-gray-600">
                Up to 49 minutes of flight with a max speed of 47 m/s.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                112x Hybrid Zoom
              </h3>
              <p className="text-gray-600">
                Capture details from up to 250 meters with precision.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matrice4Data.map((industry, index) => (
              <Card
                key={index}
                title={industry.title}
                img={industry.img}
                desc={industry.desc}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Product Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Matrice 4T
              </h3>
              <p className="text-gray-600">
                Ideal for public safety with thermal imaging and 112x zoom.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Matrice 4E
              </h3>
              <p className="text-gray-600">
                Optimized for geospatial mapping with 5-directional capture.
              </p>
            </motion.div>
          </div>
        </div>

        <div>
          <a
            href="https://enterprise.dji.com/matrice-4-series?site=enterprise&from=nav"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More & Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Page;
