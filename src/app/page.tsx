"use client";

import AboutCompanySection from "./_component/AboutCompanySection";
import CaseStudiesSection from "./_component/CaseStudiesSection";
import ContactSection from "./_component/ContactSection";
import DJIProductsSection from "./_component/DJIProductsSection";
import DroneServiceTrainingSection from "./_component/DroneServiceTrainingSection ";
import HeroSection from "./_component/HeroSection";
import ServicesSection from "./_component/ServicesSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ServicesSection />
      <DJIProductsSection />
      <DroneServiceTrainingSection />
      <CaseStudiesSection />
      <AboutCompanySection />
      <ContactSection />
    </main>
  );
}
