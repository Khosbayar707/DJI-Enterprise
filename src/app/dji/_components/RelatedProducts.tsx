'use client';

import { CustomDroneClient } from '@/lib/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RelatedProducts() {
  const { id } = useParams();
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/client/products/drones');
        if (res.data.success) {
          const all = res.data.data.drones as CustomDroneClient[];

          const filtered = all.filter((drone) => drone.id !== id).slice(0, 6); // 🔥 MAX 6

          setDrones(filtered);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  if (drones.length === 0) return null;

  return (
    <section className="mt-20 sm:mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Холбоотой бүтээгдэхүүн
        </h2>
      </div>

      <div
        className="
        grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
        gap-4 sm:gap-6 lg:gap-8
      "
      >
        {drones.map((product) => (
          <div
            key={product.id}
            className="
              group
              rounded-2xl overflow-hidden
              bg-white dark:bg-slate-900
              border border-gray-200 dark:border-gray-800
              shadow-sm dark:shadow-black/30
              hover:shadow-xl dark:hover:shadow-black/50
              transition-all duration-300
            "
          >
            <div
              className="
              relative aspect-[4/3]
              bg-gray-100 dark:bg-slate-800
              overflow-hidden
            "
            >
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Зураг байхгүй
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              <h3
                className="
                font-semibold text-base sm:text-lg
                text-gray-900 dark:text-white
                line-clamp-2
              "
              >
                {product.name}
              </h3>

              <p
                className="
                text-sm text-gray-600 dark:text-gray-400
                line-clamp-2
              "
              >
                {product.briefDescription}
              </p>

              <Link href={`/dji/${product.id}`}>
                <button
                  className="
                    mt-2 w-full py-2.5 rounded-xl
                    bg-blue-50 dark:bg-blue-900/30
                    text-blue-600 dark:text-blue-400
                    font-medium text-sm
                    hover:bg-blue-100 dark:hover:bg-blue-900/50
                    transition-all duration-300
                  "
                >
                  Дэлгэрэнгүй
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
