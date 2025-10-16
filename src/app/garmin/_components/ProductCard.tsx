'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomGarminProduct } from '@/lib/types';

interface GarminProductCardProps {
  product: CustomGarminProduct;
  index: number;
}

export default function GarminProductCard({ product, index }: GarminProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden bg-white flex flex-col h-full
                 border border-gray-200 hover:border-gray-300 hover:shadow-md transition"
    >
      <div className="flex flex-col h-full">
        <div className="relative bg-gray-50">
          <div className="relative aspect-[4/3] sm:aspect-[16/10]">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-contain p-3 sm:p-4"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                Зураг байхгүй
              </div>
            )}

            <div className="absolute top-2 right-2 flex flex-col gap-1.5 sm:gap-2">
              {product.isNew && (
                <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                  ШИНЭ
                </span>
              )}
              <span className="bg-gray-800 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                {product.type === 'SMARTWATCH' ? 'Ухаалаг цаг' : 'GPS'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
          <h3
            className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="mb-3 sm:mb-4">
            {product.discountPrice ? (
              <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {product.discountPrice.toLocaleString()}₮
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {product.price.toLocaleString()}₮
                </span>
              </div>
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {product.price.toLocaleString()}₮
              </span>
            )}
          </div>

          <div className="flex items-center mb-3 sm:mb-4">
            <div className="flex mr-1">
              {[...Array(5)].map((_, starIndex) => (
                <svg
                  key={starIndex}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                    starIndex < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81л-2.8 2.034a1 1 0 00-.364 1.118л1.07 3.292c.3.921-.755 1.688-1.54 1.118л-2.8-2.034a1 1 0 00-1.175 0л-2.8 2.034c-.784.57-1.838-.197-1.539-1.118л1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69л1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 flex-grow">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start text-xs sm:text-sm md:text-base text-gray-700"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0"
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

          <button
            className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 text-sm sm:text-base font-semibold text-white rounded-lg
                       bg-gradient-to-r from-blue-600 to-black hover:from-black hover:to-black
                       transition-all duration-500 ease-in-out shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </motion.div>
  );
}
