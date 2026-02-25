'use client';

import { CustomDroneClient } from '@/lib/types';
import {
  CheckCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type ProductInfoProps = {
  onContactClick: () => void;
  isLoading: boolean;
  drone: CustomDroneClient;
};

export default function ProductInfo({ drone, onContactClick, isLoading }: ProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        rounded-3xl
        bg-gradient-to-br
        from-white to-gray-50
        dark:from-slate-900 dark:to-slate-800
        border border-gray-100 dark:border-gray-800
        shadow-xl dark:shadow-black/40
        p-5 sm:p-8 lg:p-10
        space-y-8
        transition-colors duration-300
      "
    >
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {drone.name}
        </h1>

        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span
            className="
            inline-flex items-center gap-1.5
            px-3 py-1.5 rounded-full
            bg-emerald-50 dark:bg-emerald-900/30
            text-emerald-700 dark:text-emerald-300
            border border-emerald-100 dark:border-emerald-800
          "
          >
            <ShieldCheckIcon className="w-4 h-4" />
            Баталгаат
          </span>

          <span
            className="
            inline-flex items-center gap-1.5
            px-3 py-1.5 rounded-full
            bg-blue-50 dark:bg-blue-900/30
            text-blue-700 dark:text-blue-300
            border border-blue-100 dark:border-blue-800
          "
          >
            <TruckIcon className="w-4 h-4" />
            Хүргэлт
          </span>
        </div>

        <div
          className="
          flex items-center gap-3
          px-5 py-4
          rounded-2xl
          border
          bg-gray-50 dark:bg-slate-800
          border-gray-200 dark:border-gray-700
          text-sm sm:text-base
        "
        >
          {drone.stock > 0 ? (
            <>
              <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {drone.stock} ширхэг бэлэн байна
              </span>
            </>
          ) : (
            <>
              <ClockIcon className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-600 dark:text-red-400">
                Түр хугацаанд дууссан
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} className="w-5 h-5 text-amber-400" />
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          4.8 (12 үнэлгээ)
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Бүтээгдэхүүний тодорхойлолт
        </h3>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {drone.briefDescription ?? 'Мэдээлэл одоогоор алга!'}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Үндсэн давуу талууд
        </h3>

        <AnimatePresence>
          {drone.advantages.length > 0 ? (
            <ul className="space-y-3">
              {drone.advantages.slice(0, 6).map((adv) => (
                <li
                  key={adv.id}
                  className="
                    flex items-start gap-3
                    p-4 rounded-xl
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-slate-800
                    text-sm sm:text-base
                    hover:shadow-md
                    transition-all duration-300
                  "
                >
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 dark:text-gray-300">{adv.detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="
              flex items-center gap-3
              p-4 rounded-xl
              bg-amber-50 dark:bg-amber-900/30
              border border-amber-200 dark:border-amber-800
              text-sm
            "
            >
              <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
              <span className="text-amber-700 dark:text-amber-300">Мэдээлэл одоогоор алга!</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 pt-4">
        <button
          onClick={onContactClick}
          disabled={isLoading || drone.stock === 0}
          className="
            w-full py-4 rounded-2xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white font-semibold
            text-base sm:text-lg
            transition-all duration-300
            disabled:opacity-50
            shadow-lg hover:shadow-xl
          "
        >
          {isLoading ? 'Хүлээж байна...' : 'Үнийн санал авах'}
        </button>

        <Link href={`/preview/${drone.id}`}>
          <div
            className="
              w-full py-4 rounded-2xl
              border-2 border-blue-400 dark:border-blue-500
              text-blue-700 dark:text-blue-300
              font-semibold
              text-base sm:text-lg
              text-center
              hover:bg-blue-50 dark:hover:bg-blue-900/30
              transition-all duration-300
            "
          >
            Бүтээгдэхүүний танилцуулга
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
