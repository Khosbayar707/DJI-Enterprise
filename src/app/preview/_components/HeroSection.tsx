'use client';
import { CustomDroneClient } from '@/lib/types';
import { motion } from 'framer-motion';

type Props = {
  drone: CustomDroneClient;
};
export default function HeroSection({ drone }: Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {drone.videos.length > 0 ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={drone.videos[0].url} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 h-full w-full object-cover"></div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-black/50">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {drone.name}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {drone.briefDescription}
        </motion.p>
      </div>
    </section>
  );
}
