'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ProductListSkeleton from '../dji/_components/skeleton';
import SurveyEquipmentCard from './_components/SurveyEquipmentCard';
import { CustomSurveyEquipment } from '@/lib/types';

type EquipmentLabel = 'GNSS' | 'TOTAL_STATION' | 'THEODOLITE' | 'AUTO_LEVEL';

export default function SurveyEquipmentListPage() {
  const [equipments, setEquipments] = useState<CustomSurveyEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const selectedType = searchParams.get('type') as EquipmentLabel | null;
  const search = searchParams.get('search')?.toLowerCase() || '';

  const filteredEquipments = useMemo(() => {
    return equipments.filter((equipment) => {
      const matchesType = !selectedType || equipment.type === selectedType;
      const matchesSearch = !search || equipment.name.toLowerCase().includes(search);
      return matchesType && matchesSearch;
    });
  }, [equipments, selectedType, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedType) params.set('type', selectedType);
        if (search) params.set('search', search);

        const res = await axios.get(`/api/hitargets/search?${params.toString()}`);
        if (res.data.success) {
          setEquipments(res.data.data.equipments);
        }
      } catch (err) {
        console.error('Survey equipment fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedType, search]);

  const getTitle = () => {
    switch (selectedType) {
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

  if (loading) return <ProductListSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{getTitle()}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Геодезийн хэмжилт, инженерчлэлд зориулсан өндөр нарийвчлалтай багажуудыг үзнэ үү.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-10 overflow-x-auto pb-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link
                href="/hitarget"
                className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${
                  !selectedType
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Бүгд
              </Link>

              <Link
                href="/hitarget?type=GNSS"
                className={`px-6 py-3 text-sm font-medium border-t border-b ${
                  selectedType === 'GNSS'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                GNSS
              </Link>

              <Link
                href="/hitarget?type=TOTAL_STATION"
                className={`px-6 py-3 text-sm font-medium border-t border-b ${
                  selectedType === 'TOTAL_STATION'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Тотал станц
              </Link>

              <Link
                href="/hitarget?type=THEODOLITE"
                className={`px-6 py-3 text-sm font-medium border-t border-b ${
                  selectedType === 'THEODOLITE'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Теодолит
              </Link>

              <Link
                href="/hitarget?type=AUTO_LEVEL"
                className={`px-6 py-3 text-sm font-medium rounded-r-lg border ${
                  selectedType === 'AUTO_LEVEL'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              >
                Автомат нивелир
              </Link>
            </div>
          </div>

          {filteredEquipments.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredEquipments.map((equipment, i) => (
                <div
                  key={equipment.id}
                  className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <SurveyEquipmentCard
                    product={equipment}
                    index={i}
                    href={`/hitarget/${equipment.id}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
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
                Тухайн хайлт болон төрлөөр тохирох бүтээгдэхүүн байхгүй байна.
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
