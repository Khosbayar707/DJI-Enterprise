'use client';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CustomDroneClient } from '@/lib/types';
import axios from 'axios';
import LoadingText from './LoadingText';
import { ArrowRight, Shield, Zap, Target, RefreshCw, AlertCircle } from 'lucide-react';

export default function DJIProductsSection() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 300));

        const res = await axios.get('/api/client/products/drones', {
          signal: controller.signal,
          timeout: 10000,
        });

        if (res.data?.success) {
          setDrones(res.data.data.drones || []);
          setRetryCount(0);
        } else {
          throw new Error('Өгөгдөл авахад алдаа гарлаа');
        }
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.message !== 'canceled') {
          console.error(err);
          if (retryCount < 2) {
            setRetryCount((prev) => prev + 1);
            setTimeout(() => fetchData(), 2000);
          } else {
            setError(
              err.response?.status === 404
                ? 'Үйлчилгээ түр хугацаанд авах боломжгүй байна'
                : 'Сервертэй холбогдож чадсангүй. Дараа дахин оролдоно уу.'
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [retryCount]);

  const enterpriseDrones = useMemo(
    () => drones.filter((d) => d.droneType === 'ENTERPRISE').slice(0, 3),
    [drones]
  );

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20 lg:py-24 transition-colors overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Professional Series
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent">
                DJI Enterprise
              </span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 blur-xl opacity-70" />
            </span>
            <br className="sm:hidden" /> Бүтээгдэхүүнүүд
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Дэлхийд тэргүүлэгч DJI Enterprise дрон системүүд. <br className="hidden sm:block" />
            Ажлын үр ашгийг дээшлүүлэх шийдлүүд
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {[
              { icon: Zap, label: 'Өндөр гүйцэтгэл', value: '100%' },
              { icon: Shield, label: 'Найдвартай', value: '99.9%' },
              { icon: Target, label: 'Нарийн байдал', value: '±1cm' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full"
                  >
                    <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 animate-pulse">
                      <div className="space-y-4">
                        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                        <div className="space-y-3">
                          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded" />
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full"
              >
                <div className="max-w-md mx-auto text-center p-8 sm:p-10 rounded-2xl border border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Алдаа гарлаа
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                  <button
                    onClick={() => {
                      setRetryCount(0);
                      setError(null);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Дахин оролдох
                  </button>
                </div>
              </motion.div>
            ) : enterpriseDrones.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                aria-live="polite"
                role="status"
              >
                {enterpriseDrones.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3, margin: '-50px' }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <div className="relative h-full group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/5 dark:to-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <ProductCard drone={product} index={index} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center p-8 sm:p-10"
              >
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Бүтээгдэхүүн олдсонгүй
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Одоогоор Enterprise төрлийн дрон бэлэн байхгүй байна.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <Link href="/dji" className="inline-block group">
            <button
              className="
                relative inline-flex items-center justify-center gap-3
                rounded-xl px-8 py-4 sm:px-10 sm:py-5
                bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700
                text-white text-base sm:text-lg font-semibold
                hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800
                transition-all duration-300
                hover:scale-[1.02] active:scale-95
                shadow-lg hover:shadow-xl shadow-blue-500/25 dark:shadow-blue-500/20
                overflow-hidden
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              "
            >
              <span className="relative z-10">Бүх бүтээгдэхүүнүүдийг харах</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              30+ Professional бүтээгдэхүүн
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
