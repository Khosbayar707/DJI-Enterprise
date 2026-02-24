'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomGarminProduct } from '@/lib/types';

interface GarminProductCardProps {
  product: CustomGarminProduct;
  index: number;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center" aria-label={`Үнэлгээ ${rating.toFixed(1)} од`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const diff = rating - i;
        const isFull = diff >= 0.75;
        const isHalf = diff >= 0.25 && diff < 0.75;
        const clipId = `half-star-${i}`;

        return (
          <span key={i} className="inline-flex mr-1 last:mr-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className="text-gray-300 dark:text-gray-700"
                fill="currentColor"
              />

              {isFull && (
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className="text-yellow-400"
                  fill="currentColor"
                />
              )}

              {isHalf && (
                <>
                  <clipPath id={clipId}>
                    <rect x="0" y="0" width="10" height="20" />
                  </clipPath>
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className="text-yellow-400"
                    fill="currentColor"
                    clipPath={`url(#${clipId})`}
                  />
                </>
              )}
            </svg>
          </span>
        );
      })}

      <span className="ml-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

export default function GarminProductCard({ product, index }: GarminProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      className="
        flex h-full flex-col rounded-2xl
        border border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-900
        shadow-sm transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg
      "
    >
      <div className="relative w-full overflow-hidden rounded-t-2xl bg-gray-50 dark:bg-gray-800">
        <div className="relative aspect-[4/3]">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority={index < 3}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 dark:text-gray-500">
              Зураг байхгүй
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3
          className="
            mb-1.5 line-clamp-2 text-sm font-semibold
            text-gray-900 dark:text-white
            sm:text-base
          "
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mb-2">
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {product.discountPrice.toLocaleString()}₮
              </span>
              <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                {product.price.toLocaleString()}₮
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {product.price.toLocaleString()}₮
            </span>
          )}
        </div>

        <div className="mb-3">
          <RatingStars rating={product.rating} />
        </div>

        <ul className="space-y-2 mb-4 flex-grow">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-300"
            >
              <svg
                className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
          className="
            mt-auto w-full rounded-lg
            bg-gradient-to-r from-blue-600 to-black
            dark:from-blue-500 dark:to-gray-950
            px-4 py-2.5 text-sm font-semibold text-white
            shadow-md transition-all duration-300
            hover:from-black hover:to-black
            dark:hover:from-black dark:hover:to-black
            hover:shadow-lg active:scale-[0.98]
          "
        >
          Дэлгэрэнгүй
        </button>
      </div>
    </motion.div>
  );
}
