"use client";
import Link from "next/link";
import ProductCard from "../_component/ProductCard";
import { products } from "./utils/mock-products";

export default function ProductListPage() {
  return (
    <div className="bg-white">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index}>
                <Link href={`/dji/${product.id}`}>
                  <ProductCard
                    product={product}
                    index={index}
                    buttonText="Дэлгэрэнгүй"
                    buttonClassName="bg-blue-600 hover:bg-blue-700"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
