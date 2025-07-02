'use client';
import Link from 'next/link';
import GarminProductCard from './_components/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListSkeleton from '../dji/_components/skeleton';
import { CustomGarminProduct } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

export default function GarminProductListPage() {
  const [garmin, setGarmin] = useState<CustomGarminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/garmins${type ? `?type=${type}` : ''}`);
        if (res.data.success) {
          setGarmin(res.data.data.products);
        }
      } catch (err) {
        console.error('Garmin fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  if (loading) return <ProductListSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {type === 'SMARTWATCH'
              ? 'Garmin ухаалаг цагнууд'
              : type === 'GPS'
                ? 'Garmin GPS төхөөрөмжүүд'
                : 'Garmin бүтээгдэхүүнүүд'}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Идэвхтэй амьдралын хэв маягт тань төгс тохирох технологийг олж нээгээрэй.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link
                href="/garmin"
                className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${
                  !type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Бүх бүтээгдэхүүн
              </Link>
              <Link
                href="/garmin?type=SMARTWATCH"
                className={`px-6 py-3 text-sm font-medium border-t border-b ${
                  type === 'SMARTWATCH'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Ухаалаг цаг
              </Link>
              <Link
                href="/garmin?type=GPS"
                className={`px-6 py-3 text-sm font-medium rounded-r-lg border ${
                  type === 'GPS'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                GPS төхөөрөмж
              </Link>
            </div>
          </div>

          {garmin.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {garmin.map((product, i) => (
                <div
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <Link href={`/garmin/${product.id}`} className="block h-full">
                    <GarminProductCard product={product} index={i} />
                  </Link>
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
                Таны хайсан бүтээгдэхүүн одоогоор байхгүй байна. Дараа дахин шалгах эсвэл бүх
                цуглуулгыг үзээрэй.
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
