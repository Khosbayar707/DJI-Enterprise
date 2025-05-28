"use client";
import Link from "next/link";
import ProductCard from "../_component/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../_component/LoadingText";
import { CustomDroneClient } from "@/lib/types";

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

  console.log({ drones });
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className=" flex justify-center">
              <LoadingText />
            </div>
          ) : drones.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {drones.map((drone, i) => (
                <div key={drone.id}>
                  <Link href={`/dji/${drone.id}`} target="_blank">
                    <ProductCard drone={drone} index={i} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div>Бараа дууссан</div>
          )}
        </div>
      </section>
    </div>
  );
}
