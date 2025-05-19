import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src="/image/hero-bg.jpg"
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
            <span className="text-blue-400">DJI Enterprise</span> Дрон Технологи
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Инженер Геодези ХХК нь DJI Enterprise-ийн албан ёсны дистрибьютер.
            Мэргэжлийн дрон шийдлүүдээр таны бизнесийг дэмжинэ.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-blue-600 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
              Бүтээгдэхүүн үзэх
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition">
              Холбоо барих
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
