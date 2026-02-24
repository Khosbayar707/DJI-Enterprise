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
        setLoading(true);
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 dark:from-black dark:via-slate-900 dark:to-black text-white">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
            {type === 'SMARTWATCH'
              ? 'Garmin ухаалаг цагнууд'
              : type === 'GPS'
                ? 'Garmin GPS төхөөрөмжүүд'
                : 'Garmin бүтээгдэхүүнүүд'}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Идэвхтэй амьдралын хэв маягт тань төгс тохирох технологийг олж нээгээрэй.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* FILTER */}
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-center">
              <div className="w-full sm:w-auto overflow-x-auto scrollbar-hide">
                <div className="inline-flex min-w-max rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 overflow-hidden">
                  <FilterButton href="/garmin" active={!type} isFirst>
                    Бүх бүтээгдэхүүн
                  </FilterButton>

                  <FilterButton href="/garmin?type=SMARTWATCH" active={type === 'SMARTWATCH'}>
                    Ухаалаг цаг
                  </FilterButton>

                  <FilterButton href="/garmin?type=GPS" active={type === 'GPS'} isLast>
                    GPS төхөөрөмж
                  </FilterButton>
                </div>
              </div>
            </div>
          </div>

          {/* GRID */}
          {garmin.length > 0 ? (
            <div
              className="
                grid gap-4
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-5
                sm:gap-6
                lg:gap-8
              "
            >
              {garmin.map((product, i) => (
                <Link key={product.id} href={`/garmin/${product.id}`} className="block h-full">
                  <GarminProductCard product={product} index={i} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------------- FILTER BUTTON ---------------- */

function FilterButton({
  href,
  active,
  children,
  isLast,
  isFirst,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-5 sm:px-7 py-2.5 sm:py-3
        text-xs sm:text-sm font-medium whitespace-nowrap
        transition-all duration-200

        ${
          active
            ? 'bg-blue-600 text-white z-10 shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
        }

        ${!isLast && !active ? 'border-r border-gray-200 dark:border-gray-700' : ''}
        ${isFirst ? 'rounded-l-xl' : ''}
        ${isLast ? 'rounded-r-xl' : ''}
      `}
    >
      {children}
    </Link>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyState() {
  return (
    <div className="text-center py-20">
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

      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Бүтээгдэхүүн олдсонгүй
      </h3>

      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Таны хайсан бүтээгдэхүүн одоогоор байхгүй байна. Дараа дахин шалгах эсвэл бүх цуглуулгыг
        үзээрэй.
      </p>
    </div>
  );
}
