'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import AboutCompanySection from './_component/AboutCompanySection';
import CaseStudiesSection from './_component/CaseStudiesSection';
import ContactSection from './_component/ContactSection';
import DJIProductsSection from './_component/DJIProductsSection';
import HeroSection from './_component/HeroSection';
import ServicesSection from './_component/ServicesSection';
import ProductCard from './_component/ProductCard';
import { CustomDroneClient } from '@/lib/types';
import DroneServiceTrainingSection from './_component/DroneServiceTrainingSection ';
import Head from 'next/head';
import ProductCardSkeleton from './_component/skeleton/search-skeleton';

const App = () => {
  const search = useSearchParams().get('search');
  const [drones, setDrones] = useState<CustomDroneClient[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/client/products/drones/search?search=${search}`);
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      } catch (err) {
        console.error('Drone search fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <main className="bg-white min-h-screen">
      <Head>
        <title>Инженер Геодези ХХК - Мэргэжлийн дрон худалдаа</title>
        <meta name="description" content="Мэргэжлийн DJI дронуудыг Монголд худалдаж аваарай." />
        ...
      </Head>
      {search ? (
        loading ? (
          <section className="p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </section>
        ) : drones && drones.length > 0 ? (
          <section className="p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {drones.map((drone, index) => (
                <ProductCard key={drone.id} drone={drone} index={index} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-lg text-gray-500 py-12">Илэрц олдсонгүй!</p>
        )
      ) : (
        <>
          <HeroSection />
          <ServicesSection />
          <DJIProductsSection />
          <DroneServiceTrainingSection />
          <CaseStudiesSection />
          <AboutCompanySection />
          <ContactSection />
        </>
      )}
    </main>
  );
};

export default App;
