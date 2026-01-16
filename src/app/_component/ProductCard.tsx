import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CustomDroneClient } from '@/lib/types';

type ProductCardProps = { drone: CustomDroneClient; index: number };

export default function ProductCard({ drone, index }: ProductCardProps) {
  const firstImage = drone.images?.[0];

  const typeLabelMap: Record<string, string> = {
    ENTERPRISE: 'Enterprise',
    CONSUMER: 'Consumer',
    FPV: 'FPV',
    PAYLOAD: 'Payload',
  };

  const price =
    drone.droneType === 'CONSUMER'
      ? new Intl.NumberFormat('mn-MN', {
          style: 'currency',
          currency: 'MNT',
          maximumFractionDigits: 0,
        }).format(drone.price)
      : '';

  return (
    <Link href={`/dji/${drone.id}`} aria-label={`${drone.name} дэлгэрэнгүй`} target="_blank">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500"
      >
        <div className="relative w-full overflow-hidden rounded-t-2xl bg-white">
          <div className="relative aspect-[4/3]">
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.name || drone.name}
                fill
                className="object-cover"
                priority={index < 3}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 bg-gray-50">
                Зураг байхгүй
              </div>
            )}
          </div>

          <span
            className="
    pointer-events-none
    absolute top-2 right-2
    inline-flex items-center
    rounded-full
    bg-gray-900/85 text-white
    backdrop-blur
    ring-1 ring-white/15 shadow-sm

    /* size & spacing by breakpoint */
    px-1.5 py-0.5 text-[10px]
    sm:px-2 sm:py-0.5 sm:text-xs
    md:px-2.5 md:py-1 md:text-sm
    lg:px-3 lg:py-1 lg:text-sm

    /* prevent long text overflow on small/tablet */
    max-w-[70%] sm:max-w-[60%] md:max-w-none
    whitespace-nowrap truncate
  "
            title={typeLabelMap[drone.droneType] ?? drone.droneType}
            aria-hidden
          >
            {typeLabelMap[drone.droneType] ?? drone.droneType}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <h3
            className="mb-1.5 line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base"
            title={drone.name}
          >
            {drone.name}
          </h3>

          <p className="min-h-[44px] text-xs leading-relaxed text-gray-600 line-clamp-3 sm:min-h-[60px] sm:text-sm sm:line-clamp-4">
            {drone.briefDescription ||
              'DJI дрон нь өндөр чанартай зураг, видеогоор таны ажлыг шинэ түвшинд хүргэнэ. Тогтвортой нислэг, ухаалаг функцуудтай.'}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span
              className={`text-sm font-bold ${
                drone.droneType === 'CONSUMER' ? 'text-blue-700' : 'text-gray-900'
              } sm:text-lg`}
            >
              {price}
            </span>
          </div>

          <button
            className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-black px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-black hover:to-black hover:shadow-lg active:scale-[0.98] sm:mt-4 sm:px-4 sm:py-2.5 sm:text-base"
            aria-hidden
            tabIndex={-1}
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
