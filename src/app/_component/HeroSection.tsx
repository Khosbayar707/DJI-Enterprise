'use client';

import { Drone, Image as ImageType } from '@/generated/prisma';
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeroSkeleton from './skeleton/hero-skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

type CustomDrone = Drone & {
  images: ImageType[];
};

export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [drones, setDrones] = useState<CustomDrone[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/client/products/drones/featured');
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

  if (loading) return <HeroSkeleton />;
  if (!drones.length) return null;

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {drones.map((drone) => (
            <CarouselItem key={drone.id}>
              <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

                <Image
                  src={`${drone.images[0]?.url ?? '/image/hero-bg.jpg'}`}
                  alt={drone.name}
                  fill
                  className="object-cover object-center"
                  priority
                  quality={100}
                />

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-white max-w-2xl space-y-6"
                  >
                    <motion.h1
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      {drone.name}
                    </motion.h1>

                    <motion.p
                      className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      {drone.briefDescription}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-4 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <Link href={`/dji/${drone.id}`}>
                        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Бүтээгдэхүүн үзэх
                        </button>
                      </Link>
                      <Link href={`/dji/${drone.id}#contact-form`}>
                        <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                          Холбоо барих
                        </button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
      </Carousel>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
}
