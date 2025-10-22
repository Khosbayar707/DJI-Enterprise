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
import Head from 'next/head';
import ProductCardSkeleton from './_component/skeleton/search-skeleton';
import { motion } from 'framer-motion';
import DroneServiceTrainingSection from './_component/DroneServiceTrainingSection ';

export const dynamic = 'force-static';

const App = () => {
  const search = useSearchParams().get('search');
  const type = useSearchParams().get('type');

  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/client/products/drones/search?search=${search}&type=${type}`
        );
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
  }, [search, type]);

  const renderSearchResults = () => {
    if (loading) {
      return (
        <section className="p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      );
    }

    if (drones.length === 0) {
      return (
        <section className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center px-4">
          <div className="text-5xl">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-700">Илэрц олдсонгүй</h2>
          <p className="text-sm text-gray-500 max-w-sm">
            “<span className="font-semibold">{search}</span>” хайлттай
            {type && (
              <>
                {' '}
                ба “<span className="font-semibold">{type}</span>” төрлийн дрон{' '}
                <span className="text-red-500 font-semibold">олдсонгүй</span>.
              </>
            )}
          </p>
        </section>
      );
    }

    return (
      <motion.section
        className="p-4 md:p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drones.map((drone, index) => (
            <ProductCard key={drone.id} drone={drone} index={index} />
          ))}
        </div>
      </motion.section>
    );
  };

  return (
    <main className="bg-white min-h-screen">
      <Head>
        <title>Инженер Геодези ХХК - Дрон худалдаа, үйлчилгээ</title>
        <meta
          name="description"
          content="Инженер Геодези ХХК - Дрон худалдаа, сургалт, засвар үйлчилгээний цогц шийдэл."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Инженер Геодези ХХК - Дрон худалдаа, үйлчилгээ" />
        <meta
          property="og:description"
          content="DJI дрон, сургалт, засвар үйлчилгээтэй холбоотой бүх мэдээллийг эндээс."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://example.mn" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Инженер Геодези ХХК" />
        <meta name="twitter:description" content="Дрон худалдаа болон үйлчилгээний мэдээлэл." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://example.mn" />
      </Head>

      {search ? (
        renderSearchResults()
      ) : (
        <>
          <HeroSection />
          <ServicesSection />
          <DJIProductsSection />
          <DroneServiceTrainingSection />
          {/* <CaseStudiesSection /> */}
          <AboutCompanySection />
          <ContactSection />
        </>
      )}
    </main>
  );
};

export default App;
