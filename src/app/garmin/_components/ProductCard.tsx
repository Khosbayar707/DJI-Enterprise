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
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        <div className="relative">
          <div className="h-64 bg-gray-50 flex justify-center items-center relative">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="text-gray-400">Зураг байхгүй</div>
            )}

            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  ШИНЭ
                </span>
              )}
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {product.type === 'SMARTWATCH' ? 'Ухаалаг цаг' : 'GPS'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={product.name}>
            {product.name}
          </h3>

          <div className="mb-4">
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {product.discountPrice.toLocaleString()}₮
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.price.toLocaleString()}₮
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString()}₮
              </span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <div className="flex mr-1">
              {[...Array(5)].map((_, starIndex) => (
                <svg
                  key={starIndex}
                  className={`w-4 h-4 ${starIndex < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.rating.toFixed(1)})</span>
          </div>

          <ul className="space-y-2 mb-6 flex-grow">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
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

          <button className="w-full py-3 px-4 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-black hover:from-black hover:to-black transition-all duration-500 ease-in-out shadow-md hover:shadow-lg active:scale-[0.98]">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </motion.div>
  );
}
