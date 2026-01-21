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
  const [isHoveringContact, setIsHoveringContact] = useState(false);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl lg:sticky lg:top-6 p-6 sm:p-8 space-y-8 border border-gray-100"
    >
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              {drone.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                  <ShieldCheckIcon className="w-3.5 h-3.5" />
                  <span>Баталгаат</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                  <TruckIcon className="w-3.5 h-3.5" />
                  <span>Хүргэлт</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="relative">
            <div
              className={`
              inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-bold shadow-lg backdrop-blur-sm
              ${
                drone.stock > 10
                  ? 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 border-2 border-emerald-300/50'
                  : drone.stock > 0
                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 border-2 border-amber-300/50'
                    : 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-700 border-2 border-red-300/50'
              }
            `}
            >
              <div className="relative">
                <div
                  className={`w-3 h-3 rounded-full ${
                    drone.stock > 10
                      ? 'bg-emerald-500'
                      : drone.stock > 0
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                />
                <div
                  className={`absolute inset-0 w-3 h-3 rounded-full ${
                    drone.stock > 10
                      ? 'bg-emerald-500'
                      : drone.stock > 0
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  } animate-ping`}
                />
              </div>

              {drone.stock > 10 ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-lg">{drone.stock} ширхэг</span>
                    <span className="text-xs font-normal opacity-80">БЭЛЭН БАЙГАА</span>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                </>
              ) : drone.stock > 0 ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-lg">{drone.stock} ширхэг</span>
                    <span className="text-xs font-normal opacity-80">ҮЛДЭГДЭЛ БАГА</span>
                  </div>
                  <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-lg">ДУУССАН</span>
                    <span className="text-xs font-normal opacity-80">ТҮР ХУГАЦААНААР</span>
                  </div>
                  <ClockIcon className="w-6 h-6 text-red-500" />
                </>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2.5 rounded-xl border border-amber-200">
            <div className="flex items-center mr-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="w-5 h-5 text-amber-400" />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">4.8</span>
              <span className="text-xs text-gray-600">12 үнэлгээ</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h3 className="text-lg font-semibold text-gray-900">Бүтээгдэхүүний тодорхойлолт</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200">
          {drone.briefDescription ?? 'Мэдээлэл одоогоор алга!'}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full" />
          <h3 className="text-lg font-semibold text-gray-900">Үндсэн давуу талууд:</h3>
        </div>

        <AnimatePresence>
          {drone.advantages.length > 0 ? (
            <ul className="space-y-3">
              {drone.advantages.slice(0, 6).map((advantage, index) => (
                <motion.li
                  key={advantage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group flex items-start p-3 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/20 group-hover:animate-ping" />
                  </div>
                  <span className="ml-3 text-gray-800 text-sm sm:text-base group-hover:text-gray-900">
                    {advantage.detail}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200"
            >
              <div className="flex items-center gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
                <span className="text-amber-700">Мэдээлэл одоогоор алга!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-2">
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={onContactClick}
          disabled={isLoading || drone.stock === 0}
          onMouseEnter={() => setIsHoveringContact(true)}
          onMouseLeave={() => setIsHoveringContact(false)}
          className="relative w-full px-8 py-4 gap-3 cursor-pointer bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-20" />

          <div className="relative z-10 flex items-center gap-3">
            {isLoading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span className="text-lg font-semibold">Хүлээж байна...</span>
              </>
            ) : (
              <>
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <DocumentTextIcon className="w-5 h-5" />
                </div>
                <span className="text-lg font-semibold">Үнийн санал авах</span>
              </>
            )}
          </div>

          <div
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
              isHoveringContact ? 'opacity-100 translate-x-2' : 'opacity-0'
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </div>

          {drone.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 backdrop-blur-sm rounded-2xl">
              <span className="text-red-600 font-semibold">Одоогоор захиалах боломжгүй</span>
            </div>
          )}
        </motion.button>

        <Link href={`/preview/${drone.id}`} className="block">
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setIsHoveringPreview(true)}
            onMouseLeave={() => setIsHoveringPreview(false)}
            className="relative w-full px-8 py-4 gap-3 cursor-pointer bg-gradient-to-r from-white to-gray-50 text-blue-600 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-300 hover:border-blue-400 flex items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold">Бүтээгдэхүүний танилцуулга</span>
            </div>

            <div
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isHoveringPreview ? 'opacity-100 translate-x-2' : 'opacity-0'
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
