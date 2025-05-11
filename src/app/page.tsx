"use client";

import CaseStudiesSection from "./_component/CaseStudiesSection";
import DiscoverSection from "./_component/DiscoverSection";
import HeroSection from "./_component/HeroSection";
import IndustriesSection from "./_component/IndustriesSection";
import LatestUpdatesSection from "./_component/LatestUpdatesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <LatestUpdatesSection />
      <DiscoverSection />
    </main>
  );
}
