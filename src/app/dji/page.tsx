'use client';
import ProductCard from '../_component/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomDroneClient } from '@/lib/types';
import ProductListSkeleton from './_components/skeleton';

export default function ProductListPage() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/client/products/drones');
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Бараа дууссан</h2>
        <p className="text-sm text-gray-500">
          Одоогоор худалдаанд байгаа дрон алга байна. Дараа дахин шалгана уу.
        </p>
      </div>
    </div>
  );
}
