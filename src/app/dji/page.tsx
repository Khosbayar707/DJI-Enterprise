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
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">DJI дронууд</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Идэвхтэй амьдралын хэв маягт тань төгс тохирох технологийг олж нээгээрэй.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <FilterButtons />

          {filteredDrones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDrones.map((drone, i) => (
                <div
                  key={drone.id}
                  className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white"
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <ProductCard drone={drone} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 mb-6 text-gray-300">
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
              <h3 className="text-xl font-medium text-gray-700 mb-2">Бүтээгдэхүүн олдсонгүй</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {types.length > 0 ? (
                  <>
                    “<span className="font-semibold text-blue-600">{types.join(', ')}</span>”
                    төрлийн дрон одоогоор бүртгэгдээгүй байна.
                  </>
                ) : (
                  'Таны хайсан бүтээгдэхүүн одоогоор байхгүй байна.'
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
