import React from "react";

const HeroSection = () => (
  <section
    className="relative h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/image/hero-bg.jpg')" }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold">
        The Age of Intelligent Flight
      </h1>
      <p className="mt-4 text-lg">
        Discover cutting-edge drone solutions for every industry.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 rounded-full text-sm font-medium hover:bg-blue-700 transition">
        Explore DJI Enterprise
      </button>
    </div>
  </section>
);

export default HeroSection;
