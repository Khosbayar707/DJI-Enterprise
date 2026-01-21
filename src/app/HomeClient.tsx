'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import AboutCompanySection from './_component/AboutCompanySection';
import ContactSection from './_component/ContactSection';
import DJIProductsSection from './_component/DJIProductsSection';
import HeroSection from './_component/HeroSection';
import ServicesSection from './_component/ServicesSection';
import ProductCard from './_component/ProductCard';
import ProductCardSkeleton from './_component/skeleton/search-skeleton';
import { CustomDroneClient } from '@/lib/types';
import { motion } from 'framer-motion';
import DroneServiceTrainingSection from './_component/DroneServiceTrainingSection ';

export default function HomeClient() {
  const search = useSearchParams().get('search');
  const type = useSearchParams().get('type');

  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    setLoading(true);

    axios
      .get(`/api/client/products/drones/search?search=${search}&type=${type}`)
      .then((res) => {
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      })
      .finally(() => setLoading(false));
  }, [search, type]);

  if (search) {
    if (loading) {
      return (
        <section className="p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <motion.section className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drones.map((drone, index) => (
            <ProductCard key={drone.id} drone={drone} index={index} />
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DJIProductsSection />
      <DroneServiceTrainingSection />
      <AboutCompanySection />
      <ContactSection />
    </>
  );
}
