"use client";
import { CustomDroneClient } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RelatedProducts() {
  const { id } = useParams();
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/client/products/drones");
        if (res.data.success) {
          const drones = res.data.data.drones as CustomDroneClient[];
          const filtered = drones.filter((drone) => drone.id !== id);
          setDrones(filtered);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Холбоотой бүтээгдэхүүн
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drones.length > 0
          ? drones.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.briefDescription}
                  </p>
                  <Link href={`/dji/${product.id}`} target="_blank">
                    <button className="mt-3 w-full cursor-pointer bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                      Дэлгэрэнгүй
                    </button>
                  </Link>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
