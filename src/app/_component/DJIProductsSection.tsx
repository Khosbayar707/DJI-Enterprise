'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CustomDroneClient } from '@/lib/types';
import axios from 'axios';
import LoadingText from './LoadingText';

export default function DJIProductsSection() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError(null);
        const res = await axios.get('/api/client/products/drones', { signal: controller.signal });
        if (res.data?.success) {
          setDrones(res.data.data.drones || []);
        } else {
          setError('Өгөгдөл авахад алдаа гарлаа.');
        }
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.message !== 'canceled') {
          console.error(err);
          setError('Сервертэй холбогдож чадсангүй.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  const enterpriseDrones = useMemo(
    () => drones.filter((d) => d.droneType === 'ENTERPRISE').slice(0, 3),
    [drones]
  );

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            <span className="text-blue-600">DJI Enterprise</span> Бүтээгдэхүүнүүд
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Дэлхийд тэргүүлэгч DJI Enterprise бүтээгдэхүүнүүдийн жагсаалт
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
          aria-live="polite"
          role="status"
        >
          {loading ? (
            <>
              <LoadingText />
              <LoadingText />
              <LoadingText />
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-600 text-sm sm:text-base">
              {error}
            </div>
          ) : enterpriseDrones.length > 0 ? (
            enterpriseDrones.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
                className="h-full"
              >
                <ProductCard drone={product} index={index} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-sm sm:text-base">
              Enterprise төрлийн бараа олдсонгүй!
            </div>
          )}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Link href="/dji" className="inline-block">
            <button
              className="rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 lg:px-7 lg:py-3.5 bg-blue-600 text-white 
                         text-sm sm:text-base lg:text-lg font-medium hover:bg-blue-700 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Бүх бүтээгдэхүүнүүдийг харах
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
