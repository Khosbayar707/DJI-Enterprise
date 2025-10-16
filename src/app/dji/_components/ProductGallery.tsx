'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomDroneClient } from '@/lib/types';

type ProductGalleryProps = { drone: CustomDroneClient };

export default function ProductGallery({ drone }: ProductGalleryProps) {
  const images = useMemo(() => drone.images ?? [], [drone.images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // desktop only
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectedImage = images[selectedIndex]?.url ?? '/image/placeholder.jpg';

  // Swipe (mobile)
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? goNext() : goPrev();
    }
    setTouchStartX(null);
  };

  const goNext = useCallback(() => {
    if (images.length < 2) return;
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length < 2) return;
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Zoom (desktop only)
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // md breakpoint
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setIsZoomed(true);
  };
  const onMouseLeave = () => setIsZoomed(false);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main image */}
      <div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Square on mobile, taller on md+ like Garmin */}
        <div className="relative w-full aspect-square md:h-[480px] lg:h-[520px]">
          <Image
            src={selectedImage}
            alt={drone.name}
            fill
            className={`transition-transform duration-300 ${
              // Cover on mobile so card looks consistent; contain on desktop for accuracy
              'object-cover md:object-contain'
            } ${isZoomed ? 'md:scale-150' : 'scale-100'}`}
            style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
            priority
          />
        </div>

        {/* Discount badge */}
        {drone.discount > 0 && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-xs md:text-sm font-bold px-2.5 py-1 rounded-full shadow-md">
            Хямдрал
          </span>
        )}

        {/* Arrows (hidden if 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow transition md:hover:scale-110 active:scale-95"
              aria-label="Өмнөх зураг"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow transition md:hover:scale-110 active:scale-95"
              aria-label="Дараах зураг"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Counter (desktop) */}
            <div className="hidden md:block absolute top-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — horizontal scroller on mobile, grid on md+ */}
      {images.length > 1 && (
        <div className="relative">
          <div
            id="thumbnails-container"
            className="flex md:grid md:grid-cols-6 gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide py-1 -mx-1 px-1"
          >
            {images.map((img, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={[
                    'relative flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-200',
                    active
                      ? 'border-blue-600 shadow-md scale-[1.03]'
                      : 'border-gray-200 hover:border-blue-400 hover:scale-[1.03] active:scale-95',
                  ].join(' ')}
                  style={{
                    // Mobile: consistent squares that scale with viewport; Desktop: fixed
                    width: 'clamp(64px, 20vw, 96px)',
                    height: 'clamp(64px, 20vw, 96px)',
                  }}
                  aria-label={`Зураг ${i + 1}`}
                  aria-current={active ? 'true' : 'false'}
                >
                  <Image
                    src={img.url}
                    alt={`${drone.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 96px"
                  />
                  {active && (
                    <div className="absolute inset-0 bg-blue-600/15 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right fade hint on mobile to indicate scroll */}
          <div className="pointer-events-none md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
      )}
    </div>
  );
}
