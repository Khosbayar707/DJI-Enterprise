import { CustomDroneClient } from '@/lib/types';
import {
  CheckCircleIcon,
  ArrowPathIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type ProductInfoProps = {
  onContactClick: () => void;
  isLoading: boolean;
  drone: CustomDroneClient;
};

export default function ProductInfo({ drone, onContactClick, isLoading }: ProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        bg-gradient-to-br from-white to-gray-50
        rounded-3xl shadow-2xl
        p-6 sm:p-8 lg:p-10
        space-y-8
        border border-gray-100
      "
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {drone.name}
          </h1>

          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border">
              <ShieldCheckIcon className="w-4 h-4" />
              Баталгаат
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border">
              <TruckIcon className="w-4 h-4" />
              Хүргэлт
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm sm:text-base">
          {drone.stock > 0 ? (
            <>
              <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-emerald-700">
                {drone.stock} ширхэг бэлэн байна
              </span>
            </>
          ) : (
            <>
              <ClockIcon className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-600">Түр хугацаанд дууссан</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} className="w-5 h-5 text-amber-400" />
          ))}
        </div>
        <span className="text-sm sm:text-base text-gray-600">4.8 (12 үнэлгээ)</span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Бүтээгдэхүүний тодорхойлолт
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
          {drone.briefDescription ?? 'Мэдээлэл одоогоор алга!'}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Үндсэн давуу талууд</h3>

        <AnimatePresence>
          {drone.advantages.length > 0 ? (
            <ul className="space-y-3">
              {drone.advantages.slice(0, 6).map((adv) => (
                <li
                  key={adv.id}
                  className="flex items-start gap-3 p-3 rounded-xl border bg-white text-sm sm:text-base"
                >
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-800">{adv.detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-amber-50 border rounded-xl text-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
              <span className="text-amber-700">Мэдээлэл одоогоор алга!</span>
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
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold
            text-base sm:text-lg
            transition disabled:opacity-50
          "
        >
          {isLoading ? 'Хүлээж байна...' : 'Үнийн санал авах'}
        </button>

        <Link href={`/preview/${drone.id}`}>
          <div
            className="
            w-full py-4 rounded-2xl
            border-2 border-blue-300
            text-blue-700 font-semibold
            text-base sm:text-lg
            text-center hover:bg-blue-50 transition
          "
          >
            Бүтээгдэхүүний танилцуулга
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
