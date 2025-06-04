"use client";

import { Drone, Image as ImageType } from "@/generated/prisma";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeroSkeleton from "./skeleton/hero-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

type CustomDrone = Drone & {
  images: ImageType[];
};
export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [drones, setDrones] = useState<CustomDrone[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/client/products/drones/featured");
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
  return loading ? (
    <HeroSkeleton />
  ) : (
    drones.length > 0 && (
      <Carousel className="relative">
        <CarouselContent>
          {drones.map((drone) => (
            <CarouselItem key={drone.id}>
              <section className="relative h-screen w-full">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                  src={`${drone.images[0]?.url ?? "/image/hero-bg.jpg"}`}
                  alt="DJI Enterprise Drone"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white max-w-2xl"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      {drone.name}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                      {drone.briefDescription}
                    </p>
                    <div className="flex gap-4">
                      <Link href={`/dji/${drone.id}`}>
                        <button className="px-8 py-3 bg-blue-600 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                          Бүтээгдэхүүн үзэх
                        </button>
                      </Link>
                      <Link href={`/dji/${drone.id}#contact-form`}>
                        <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition">
                          Холбоо барих
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30" />
      </Carousel>
    )
  );
}
