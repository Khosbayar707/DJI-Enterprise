'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProductListSkeleton from '../dji/_components/skeleton';
import PayloadCard from './_components/PayloadCard';
import { CustomPayload } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import PayloadFilter from './_components/filter';
import { PayloadType } from '@/generated/prisma';

type PayloadLabel = 'Payload and Camera' | 'Program';

const typeLabelToEnum: Record<PayloadLabel, PayloadType> = {
  'Payload and Camera': 'PAYLOAD_AND_CAMERA',
  Program: 'PROGRAM',
};

export default function DronePayloadListPage() {
  const [payloads, setPayloads] = useState<CustomPayload[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const selectedTypes = searchParams.getAll('type');
  const enumTypes = selectedTypes
    .map((label) => typeLabelToEnum[label as PayloadLabel])
    .filter((v): v is PayloadType => !!v);

  const search = searchParams.get('search')?.toLowerCase();

  const filteredDronePayloads = useMemo(() => {
    if (enumTypes.length === 0 && !search) return payloads;
    return payloads.filter((payload) => {
      const matchesType = enumTypes.length === 0 || enumTypes.includes(payload.type);
      const matchesSearch = !search || payload.name.toLowerCase().includes(search);
      return matchesType && matchesSearch;
    });
  }, [payloads, enumTypes, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/payloads');
        if (res.data.success) setPayloads(res.data.data.payloads);
      } catch (err) {
        console.error('Payload fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <ProductListSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header — same rhythm as DJI page */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-16 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 animate-fade-in">
            DJI Payload бүтээгдэхүүнүүд
          </h1>
          <p className="text-sm sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Дрон технологид нэмэлт хүч оруулах зориулалттай Zenmuse, LiDAR болон бусад Payload
            бүтээгдэхүүнүүдийг үзнэ үү.
          </p>
        </div>
      </div>

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Sticky filter bar — mirrors DJI drones page */}
          <div className="sticky top-0 z-20 -mx-3 sm:mx-0 mb-4 sm:mb-6 bg-gray-50/80 sm:bg-transparent supports-[backdrop-filter]:backdrop-blur px-3 sm:px-0 py-2 sm:py-0 border-b sm:border-0">
            <div className="max-w-7xl mx-auto overflow-x-auto sm:overflow-visible scrollbar-hide">
              <div className="min-w-max sm:min-w-0">
                <PayloadFilter />
              </div>
            </div>
          </div>

          {filteredDronePayloads.length > 0 ? (
            <div
              className={`
                grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-3 sm:gap-5 lg:gap-8
              `}
            >
              {filteredDronePayloads.map((payload, i) => (
                <div
                  key={payload.id}
                  className="group bg-white rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 touch-manipulation"
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationDelay: `${i * 0.06}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <Link href={`/payload/${payload.id}`} className="block h-full">
                    <PayloadCard payload={payload} index={i} />
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
                Payload олдсонгүй
              </h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                Таны хайсан payload одоогоор байхгүй байна.
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
          animation: fadeIn 0.6s ease-out;
        }
        /* mobile scrollbar hide helper to match DJI page feel */
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
