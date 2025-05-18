"use client";
import HeroSection from "../_components/HeroSection";
import FeaturesSection from "../_components/FeaturesSection";
import DetailSection from "../_components/DetailSection";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <FeaturesSection />
      <DetailSection />
    </main>
  );
}
