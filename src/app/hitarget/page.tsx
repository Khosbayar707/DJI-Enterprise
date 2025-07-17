'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ProductListSkeleton from '../dji/_components/skeleton';
import SurveyEquipmentCard from './_components/SurveyEquipmentCard';
import { CustomSurveyEquipment } from '@/lib/types';

export default function SurveyEquipmentListPage() {
  const [equipment, setEquipment] = useState<CustomSurveyEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/hitargets${type ? `?type=${type}` : ''}`);
        if (res.data.success) {
          setEquipment(res.data.data.equipment);
        }
      } catch (err) {
        console.error('Survey equipment fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  if (loading) return <ProductListSkeleton />;

  const getTitle = () => {
    switch (type) {
      case 'GNSS':
        return 'GNSS хүлээн авагч';
      case 'TOTAL_STATION':
        return 'Тотал станц';
      case 'THEODOLITE':
        return 'Теодолит';
      case 'AUTO_LEVEL':
        return 'Автомат нивелир';
      default:
        return 'Геодезийн багажууд';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-12 md:py-16 lg:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {getTitle()}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
            Шинэ үеийн геодезийн багаж төхөөрөмжүүдээр тоноглогдоорой.
          </p>
        </div>
      </div>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link
                href="/hitarget"
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-l-lg border ${
                  !type
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200 whitespace-nowrap`}
              >
                Бүгд
              </Link>
              <Link
                href="/hitarget?type=GNSS"
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium border-t border-b ${
                  type === 'GNSS'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200 whitespace-nowrap`}
              >
                GNSS
              </Link>
              <Link
                href="/hitarget?type=TOTAL_STATION"
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium border-t border-b ${
                  type === 'TOTAL_STATION'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200 whitespace-nowrap`}
              >
                Тотал станц
              </Link>
              <Link
                href="/hitarget?type=THEODOLITE"
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium border-t border-b ${
                  type === 'THEODOLITE'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200 whitespace-nowrap`}
              >
                Теодолит
              </Link>
              <Link
                href="/hitarget?type=AUTO_LEVEL"
                className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-r-lg border ${
                  type === 'AUTO_LEVEL'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200 whitespace-nowrap`}
              >
                Автомат нивелир
              </Link>
            </div>
          </div>

          {equipment.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {equipment.map((product, i) => (
                <div
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <Link href={`/hitarget/${product.id}`} className="block h-full">
                    <SurveyEquipmentCard product={product} index={i} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 text-gray-300">
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
                Тухайн төрлийн багаж одоогоор бүртгэгдээгүй байна. Дараа дахин шалгаарай.
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
