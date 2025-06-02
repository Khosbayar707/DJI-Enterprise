"use client";
import { useState, useEffect } from "react";
import AddGarminProduct from "./add-product/add-garmin-product";
import EditProductDialog from "./edit-product/EditProductDialog";
import { GarminProduct } from "@/generated/prisma";
import axios from "axios";

export default function GarminProductTable() {
  const [products, setProducts] = useState<GarminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/garmins");
      if (response.data.success) {
        setProducts(response.data.data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Garmin Products</h2>
        <AddGarminProduct setRefresh={setRefresh} />
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Бүтээгдэхүүн олдсонгүй</p>
          <AddGarminProduct setRefresh={setRefresh} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <EditProductDialog key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
