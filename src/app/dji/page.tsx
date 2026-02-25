'use client';

import ProductCard from '../_component/ProductCard';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { CustomDroneClient } from '@/lib/types';
import ProductListSkeleton from './_components/skeleton';
import { useSearchParams } from 'next/navigation';
import FilterButtons from './_components/drone-page-filter';

export default function ProductListPage() {
  const searchParams = useSearchParams();
  const types = searchParams.getAll('type').map((t) => t.toUpperCase());
  const search = searchParams.get('search');

  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredDrones = useMemo(() => {
    if (types.length === 0 && !search) return drones;

    return drones.filter((drone) => {
      const matchesType = types.length === 0 || types.includes(drone.droneType.toUpperCase());

      const matchesSearch = !search || drone.name.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [drones, types, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/client/products/drones');
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      } catch (err) {
        console.error('DJI fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ProductListSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">DJI дронууд</h1>
          <p className="text-sm sm:text-lg text-blue-100 dark:text-gray-300 max-w-2xl mx-auto">
            Идэвхтэй амьдралын хэв маягт тань төгс тохирох технологийг олж нээгээрэй.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-3 sm:px-4">
          {/* FILTER */}
          <div className="sticky top-0 z-20 mb-6 bg-gray-50/90 dark:bg-[#0B1120]/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide py-2">
              <FilterButtons />
            </div>
          </div>

          {/* GRID */}
          {filteredDrones.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
              {filteredDrones.map((drone, i) => (
                <div
                  key={drone.id}
                  className="group bg-white dark:bg-slate-900 border border-transparent dark:border-gray-800 rounded-xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                  style={{
                    animation: 'fadeInUp 0.5s ease-out',
                    animationDelay: `${i * 0.06}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <ProductCard drone={drone} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="mx-auto w-20 h-20 mb-6 text-gray-300 dark:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
                Бүтээгдэхүүн олдсонгүй
              </h3>

              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base">
                {types.length > 0
                  ? `“${types.join(', ')}” төрлийн дрон одоогоор бүртгэгдээгүй байна.`
                  : 'Таны хайсан бүтээгдэхүүн одоогоор байхгүй байна.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GLOBAL CSS SAFE */}
      <style global jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
