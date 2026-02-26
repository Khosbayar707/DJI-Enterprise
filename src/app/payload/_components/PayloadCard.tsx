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
  const firstImage = payload.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      className="flex h-full flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-blue-900/20 focus-within:ring-2 focus-within:ring-blue-500"
    >
      {/* Image block — fixed aspect ratio like DJI cards */}
      <div className="relative w-full overflow-hidden rounded-t-2xl bg-white dark:bg-gray-800">
        <div className="relative aspect-[4/3]">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.name || payload.name}
              fill
              className="object-cover dark:brightness-90 dark:hover:brightness-100 transition-all duration-300"
              priority={index < 3}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-700 text-xs text-gray-400 dark:text-gray-500">
              Зураг байхгүй
            </div>
          )}
        </div>

        {/* Type badge — same responsive style as DJI card */}
        <span
          className="
            pointer-events-none absolute top-2 right-2 inline-flex items-center
            rounded-full bg-gray-900/85 dark:bg-gray-950/90 text-white backdrop-blur ring-1 ring-white/15 dark:ring-white/10 shadow-sm
            px-1.5 py-0.5 text-[10px]
            sm:px-2 sm:py-0.5 sm:text-xs
            md:px-2.5 md:py-1 md:text-sm
            lg:px-3 lg:py-1 lg:text-sm
            max-w-[70%] sm:max-w-[60%] md:max-w-none whitespace-nowrap truncate
          "
          title={payloadTypeLabel[payload.type]}
          aria-hidden
        >
          {payloadTypeLabel[payload.type]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3
          className="mb-1.5 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white sm:text-base"
          title={payload.name}
        >
          {payload.name}
        </h3>

        {/* Feature bullets (trimmed & clamped like DJI brief) */}
        <ul className="mb-3 space-y-1.5 sm:mb-4">
          {payload.features.slice(0, 3).map((feature, i) => (
            <li
              key={i}
              className="flex items-start text-xs text-gray-600 dark:text-gray-300 sm:text-sm"
            >
              <svg
                className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400"
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

        <div className="mt-auto">
          <button
            className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-black dark:from-blue-600 dark:to-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-black hover:to-black dark:hover:from-gray-900 dark:hover:to-gray-900 hover:shadow-lg dark:hover:shadow-blue-900/30 active:scale-[0.98] sm:mt-3 sm:px-4 sm:py-2.5 sm:text-base"
            aria-hidden
            tabIndex={-1}
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </motion.div>
  );
}
