import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CustomDroneClient } from '@/lib/types';

type ProductCardProps = {
  drone: CustomDroneClient;
  index: number;
};

export default function ProductCard({ drone, index }: ProductCardProps) {
  return (
    <Link href={`/dji/${drone.id}`} target="_blank">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col bg-white"
      >
        <div className="relative w-full aspect-[4/3] bg-gray-200">
          {drone.images.length > 0 ? (
            <Image
              src={drone.images[0].url}
              alt={drone.images[0].name}
              fill
              className="object-cover"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Зураг алга
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">{drone.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-1">{drone.briefDescription}</p>
          </div>
          {drone.droneType === 'CONSUMER' && (
            <p className="mt-2 text-blue-600 font-semibold text-lg">
              {new Intl.NumberFormat('mn-MN', {
                style: 'currency',
                currency: 'MNT',
                maximumFractionDigits: 0,
              }).format(drone.price)}
            </p>
          )}
          <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Дэлгэрэнгүй
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
