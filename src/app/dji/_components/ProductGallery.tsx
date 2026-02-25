'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomDroneClient } from '@/lib/types';

type ProductGalleryProps = { drone: CustomDroneClient };

export default function ProductGallery({ drone }: ProductGalleryProps) {
  const images = useMemo(() => drone.images ?? [], [drone.images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectedImage = images[selectedIndex]?.url ?? '/image/placeholder.jpg';

  const goNext = useCallback(() => {
    if (images.length < 2) return;
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length < 2) return;
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? goNext() : goPrev();
    setTouchStartX(null);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setIsZoomed(true);
  };

  const onMouseLeave = () => setIsZoomed(false);

  return (
    <div className="space-y-4">
      <div
        className="
          relative rounded-2xl overflow-hidden
          bg-white dark:bg-slate-900
          border border-gray-200 dark:border-gray-800
          shadow-md dark:shadow-black/40
          transition-all duration-300
        "
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/3]">
          <Image
            src={selectedImage}
            alt={drone.name}
            fill
            priority
            className={`
              object-contain p-4
              transition-transform duration-500 ease-out
              ${isZoomed ? 'lg:scale-150' : 'scale-100'}
            `}
            style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          />
        </div>

        {images.length > 1 && (
          <div
            className="
            absolute top-3 left-3
            bg-black/60 dark:bg-black/70
            text-white text-xs sm:text-sm
            px-3 py-1 rounded-full
            backdrop-blur-md
          "
          >
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                bg-white/80 dark:bg-slate-800/80
                hover:bg-white dark:hover:bg-slate-700
                text-gray-800 dark:text-gray-100
                backdrop-blur-md
                rounded-full p-2 sm:p-3
                shadow-lg
                transition-all duration-300
                hover:scale-110 active:scale-95
              "
              aria-label="Өмнөх зураг"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goNext}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                bg-white/80 dark:bg-slate-800/80
                hover:bg-white dark:hover:bg-slate-700
                text-gray-800 dark:text-gray-100
                backdrop-blur-md
                rounded-full p-2 sm:p-3
                shadow-lg
                transition-all duration-300
                hover:scale-110 active:scale-95
              "
              aria-label="Дараах зураг"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="relative">
          <div
            className="
            flex lg:grid lg:grid-cols-6
            gap-3 overflow-x-auto lg:overflow-visible
            scrollbar-hide py-1
          "
          >
            {images.map((img, i) => {
              const active = i === selectedIndex;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`
                    relative rounded-xl overflow-hidden
                    border-2 transition-all duration-300
                    w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:h-auto lg:aspect-square
                    ${
                      active
                        ? 'border-blue-600 dark:border-blue-500 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-105'
                    }
                  `}
                >
                  <Image
                    src={img.url}
                    alt={`${drone.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {active && (
                    <div className="absolute inset-0 bg-blue-600/15 dark:bg-blue-500/20" />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="
            pointer-events-none lg:hidden
            absolute right-0 top-0 h-full w-10
            bg-gradient-to-l
            from-white dark:from-slate-900
            to-transparent
          "
          />
        </div>
      )}
    </div>
  );
}
