"use client";
import ProductCard from "../_component/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomDroneClient } from "@/lib/types";
import ProductListSkeleton from "./_components/skeleton";

export default function ProductListPage() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/client/products/drones");
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <ProductListSkeleton />
  ) : drones.length > 0 ? (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drones.map((drone, i) => (
              <ProductCard key={drone.id} drone={drone} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div>Бараа дууссан</div>
  );
}
