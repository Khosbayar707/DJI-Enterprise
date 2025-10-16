'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CustomSurveyEquipment } from '@/lib/types';

interface EquipmentProductCardProps {
  product: CustomSurveyEquipment;
  index: number;
  href: string;
}

function formatTugrug(n: number) {
  return n.toLocaleString('mn-MN') + '₮';
}

export default function EquipmentProductCard({ product, index, href }: EquipmentProductCardProps) {
  const stockState =
    product.stock > 10
      ? {
          cls: 'bg-green-50 text-green-700 border-green-300',
          text: `Бэлэн: ${product.stock} ш`,
          icon: 'check',
        }
      : product.stock > 0
        ? {
            cls: 'bg-amber-50 text-amber-700 border-amber-300',
            text: `Үлдэгдэл: ${product.stock} ш`,
            icon: 'warn',
          }
        : { cls: 'bg-red-50 text-red-700 border-red-300', text: 'Түр дууссан', icon: 'info' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="h-full flex flex-col">
        <div className="relative w-full aspect-square bg-gray-50">
          {product.images?.length ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              Зураг байхгүй
            </div>
          )}

          <div className="absolute top-2 right-2">
            <span className="bg-gray-900/90 text-white text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              {product.type}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3
            className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="mb-3">
            <span className="text-lg sm:text-xl font-extrabold text-gray-900">
              {formatTugrug(product.price)}
            </span>
          </div>

          {product.features?.length > 0 && (
            <ul className="space-y-1.5 sm:space-y-2 mb-5">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start text-[13px] sm:text-sm text-gray-700">
                  <svg
                    className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <Link href={href} className="mt-auto">
            <span
              className="
                inline-flex w-full justify-center py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg
                bg-gradient-to-r from-indigo-600 to-black hover:from-black hover:to-black
                transition-all duration-500 ease-in-out shadow-md hover:shadow-lg active:scale-[0.98]
              "
            >
              Дэлгэрэнгүй
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
