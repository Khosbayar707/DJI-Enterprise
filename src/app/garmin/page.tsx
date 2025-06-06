"use client";
import Link from "next/link";
import GarminProductCard from "./_components/ProductCard";
import { GarminProduct } from "../_types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductListSkeleton from "../dji/_components/skeleton";
import { CustomGarminProduct } from "@/lib/types";

export default function GarminProductListPage() {
  const [garmin, setGarmin] = useState<CustomGarminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/garmins");
        if (res.data.success) {
          console.log(res.data.data.products);
          setGarmin(res.data.data.products);
        }
      } catch (err) {
        console.error("Garmin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <ProductListSkeleton />;

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Garmin Products
          </h1>

          {garmin.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {garmin.map((product, i) => (
                <div
                  key={product.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/garmin/${product.id}`}>
                    <GarminProductCard product={product} index={i} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Бүтээгдэхүүн олдсонгүй.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
