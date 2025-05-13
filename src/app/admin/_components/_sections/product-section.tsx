"use client";

import CategoriesSection from "../_cards/categories-card";
import DroneCard from "../_cards/drone-card";
import SpecCard from "../_cards/spec-card";

const ProductSection = () => {
  return (
    <div className=" flex flex-col gap-6">
      <CategoriesSection />
      <DroneCard />
      <SpecCard />
    </div>
  );
};

export default ProductSection;
