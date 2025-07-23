'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomSurveyEquipment } from '@/lib/types';

interface EquipmentProductCardProps {
  product: CustomSurveyEquipment;
  index: number;
}

export default function EquipmentProductCard({ product, index }: EquipmentProductCardProps) {
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

            <div className="absolute top-2 right-2">
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {product.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={product.name}>
            {product.name}
          </h3>

          <div className="mb-4">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString()}₮
            </span>
          </div>

          <ul className="space-y-2 mb-6 flex-grow">
            {product.features?.slice(0, 3).map((feature, idx) => (
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
