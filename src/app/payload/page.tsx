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
        if (res.data.success) {
          setPayloads(res.data.data.payloads);
        }
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            DJI Payload бүтээгдэхүүнүүд
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Дрон технологид нэмэлт хүч оруулах зориулалттай Zenmuse, Lidar болон бусад Payload
            бүтээгдэхүүнүүдийг үзнэ үү.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <PayloadFilter />
          {filteredDronePayloads.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDronePayloads.map((payload, i) => (
                <div
                  key={payload.id}
                  className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white"
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationDelay: `${i * 0.1}s`,
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
              <h3 className="text-xl font-medium text-gray-700 mb-2">Payload олдсонгүй</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Таны хайсан payload одоогоор байхгүй байна. Дараа дахин шалгана уу.
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
