'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomPayload } from '@/lib/types';
import { PayloadType } from '@/generated/prisma';

interface PayloadCardProps {
  payload: CustomPayload;
  index: number;
}

const payloadTypeLabel: Record<PayloadType, string> = {
  ZENMUSE: 'Zenmuse',
  LIDAR: 'Lidar',
  SPEAKER: 'Speaker',
  SPOTLIGHT: 'Spotlight',
  TETHER: 'Tether',
  OTHER: 'Other',
  PROGRAM: 'Program',
  PAYLOAD_AND_CAMERA: 'Payload & Camera',
};

export default function PayloadCard({ payload, index }: PayloadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full border border-gray-100 hover:border-gray-200"
    >
      <div className="flex flex-col h-full">
        <div className="relative group">
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center relative overflow-hidden">
            {payload.images.length > 0 ? (
              <>
                <Image
                  src={payload.images[0].url}
                  alt={payload.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Зураг байхгүй
              </div>
            )}

            <div className="absolute top-3 right-3">
              <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                {payloadTypeLabel[payload.type]}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight"
            title={payload.name}
          >
            {payload.name}
          </h3>

          <ul className="space-y-2.5 mb-6 flex-grow">
            {payload.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-700">
                <svg
                  className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
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

          <button className="w-full py-3 px-4 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-black hover:from-black hover:to-black transition-all duration-500 ease-in-out shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center">
            <span>Дэлгэрэнгүй</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
