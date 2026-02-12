'use client';

import { Drone, Image as ImageType } from '@/generated/prisma';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ChevronDown, Camera, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

type CustomDrone = Drone & {
  images: ImageType[];
};

export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [drones, setDrones] = useState<CustomDrone[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on('select', onSelect);
      onSelect();

      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  if (loading) return <HeroSkeleton />;
  if (!drones.length) return null;

  return (
    <div className="relative">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {drones.map((drone, idx) => (
            <CarouselItem key={drone.id}>
              <section className="relative h-[calc(100vh-4rem)] md:h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 via-40% to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:via-50% md:to-transparent z-10" />

                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: currentIndex === idx ? 1.1 : 1,
                  }}
                  transition={{ duration: 6, ease: 'easeOut' }}
                >
                  <Image
                    src={`${drone.images[0]?.url ?? '/image/hero-bg.jpg'}`}
                    alt={drone.name}
                    fill
                    className="object-cover object-center"
                    priority={idx === 0}
                    quality={100}
                    sizes="100vw"
                  />
                </motion.div>

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-end md:justify-center px-4 sm:px-6 lg:px-8 pb-20 md:pb-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-white max-w-xl md:max-w-2xl space-y-4 md:space-y-6"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium"
                    >
                      <Camera className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                      Онцлох бүтээгдэхүүн
                    </motion.span>

                    <motion.h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {drone.name}
                    </motion.h1>

                    <motion.p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-lg leading-relaxed md:leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {drone.briefDescription}
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 md:pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Link href={`/dji/${drone.id}`} className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center">
                          <span>Бүтээгдэхүүн үзэх</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </Link>
                      <Link href={`/dji/${drone.id}#contact-form`} className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/30 hover:border-white rounded-lg md:rounded-xl text-sm md:text-base font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                          Холбоо барих
                        </button>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="hidden md:flex items-center gap-6 pt-8"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300">Бэлэн</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-300">{drone.images.length} зураг</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex md:hidden gap-2">
                  {drones.map((_, i) => (
                    <button
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex ? 'w-6 bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => scrollTo(i)}
                    />
                  ))}
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm border-none text-white rounded-full transition-all duration-300 hover:scale-110" />
        <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm border-none text-white rounded-full transition-all duration-300 hover:scale-110" />
      </Carousel>

      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-xs text-white/70 uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / drones.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
