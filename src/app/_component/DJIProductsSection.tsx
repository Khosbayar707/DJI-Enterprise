'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CustomDroneClient } from '@/lib/types';
import axios from 'axios';
import LoadingText from './LoadingText';

export default function DJIProductsSection() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/client/products/drones');
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-600">DJI Enterprise</span> Бүтээгдэхүүнүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Дэлхийд тэргүүлэгч DJI Enterprise бүтээгдэхүүнүүдийн жагсаалт
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <LoadingText />
          ) : drones.length > 0 ? (
            drones.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard drone={product} index={index} />
              </motion.div>
            ))
          ) : (
            <div>Бараа дууссан байна!</div>
          )}
        </div>
      </div>
      <div className="text-center mt-12">
        <Link href="/dji">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Бүх бүтээгдэхүүнүүдийг харах
          </button>
        </Link>
      </div>
    </section>
  );
}
