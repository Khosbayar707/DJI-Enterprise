import Image from "next/image";
import { motion } from "framer-motion";
import { Drone } from "@/generated/prisma";
import { CustomDrone, CustomDroneClient } from "@/lib/types";

type ProductCardProps = {
  drone: CustomDroneClient;
  index: number;
};

export default function ProductCard({ drone, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-128 flex flex-col justify-between`}
    >
      <div className=" flex flex-col gap-3">
        <div className="h-64 relative bg-gray-200 flex justify-center items-center">
          {drone.images.length > 0 ? (
            <Image
              src={drone.images[0].url}
              alt={drone.images[0].name}
              fill
              className="object-cover"
              priority={index < 3}
            />
          ) : (
            <div>Зураг алга</div>
          )}
        </div>
        <div className=" p-6">
          <h3 className="text-xl font-bold mb-2">{drone.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {drone.briefDescription}
          </p>
        </div>
      </div>
      <div className="p-6">
        <button
          className={`w-full py-2 bg-blue-600 text-background rounded-lg transition`}
        >
          Дэлгэрэнгүй
        </button>
      </div>
    </motion.div>
  );
}
