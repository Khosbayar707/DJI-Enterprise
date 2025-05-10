"use client";

import CategoriesSection from "../_cards/categories-card";
import ProductCard from "../_cards/drone-card";

const ProductSection = () => {
  return (
    <div className=" flex flex-col gap-6">
      <CategoriesSection />
      <ProductCard />
    </div>
  );
};

export default ProductSection;
