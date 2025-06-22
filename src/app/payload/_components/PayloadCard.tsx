'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomPayload } from '@/lib/types';

interface PayloadCardProps {
  payload: CustomPayload;
  index: number;
}

export default function PayloadCard({ payload, index }: PayloadCardProps) {
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
            {payload.images.length > 0 ? (
              <Image
                src={payload.images[0].url}
                alt={payload.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="text-gray-400">Зураг байхгүй</div>
            )}

            <div className="absolute top-2 right-2">
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {payload.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={payload.name}>
            {payload.name}
          </h3>

          <div className="mb-4">
            <span className="text-xl font-bold text-gray-900">
              ${payload.price.toLocaleString()}
            </span>
          </div>

          <ul className="space-y-2 mb-6 flex-grow">
            {payload.features.slice(0, 3).map((feature, idx) => (
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

          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </motion.div>
  );
}
