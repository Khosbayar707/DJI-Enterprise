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
        if (res.data.success) setGarmin(res.data.data.products);
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
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-16 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 animate-fade-in">
            {type === 'SMARTWATCH'
              ? 'Garmin ухаалаг цагнууд'
              : type === 'GPS'
                ? 'Garmin GPS төхөөрөмжүүд'
                : 'Garmin бүтээгдэхүүнүүд'}
          </h1>
          <p className="text-sm sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Идэвхтэй амьдралын хэв маягт тань төгс тохирох технологийг олж нээгээрэй.
          </p>
        </div>
      </div>

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-center mb-6 sm:mb-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link
                href="/garmin"
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-l-lg border ${
                  !type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Бүх бүтээгдэхүүн
              </Link>
              <Link
                href="/garmin?type=SMARTWATCH"
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-t border-b ${
                  type === 'SMARTWATCH'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Ухаалаг цаг
              </Link>
              <Link
                href="/garmin?type=GPS"
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-r-lg border ${
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
            <div
              className={`
                grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-3 sm:gap-5 lg:gap-8
              `}
            >
              {garmin.map((product, i) => (
                <div
                  key={product.id}
                  className="group hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white hover:border-blue-300"
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationDelay: `${i * 0.06}s`,
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
            <div className="text-center py-16 sm:py-20">
              <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 text-gray-300">
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
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
                Бүтээгдэхүүн олдсонгүй
              </h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation-name: fadeIn;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
