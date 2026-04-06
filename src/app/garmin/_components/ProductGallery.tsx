'use client';

import { CustomGarminProduct } from '@/lib/types';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: CustomGarminProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.images.length > 0
      ? product.images
      : [{ url: '/image/placeholder.jpg', name: 'placeholder' }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const selectedImage = images[currentIndex].url;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setLoading(true);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setLoading(true);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
    setTouchStart(null);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext, handlePrev]);

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/3] group cursor-zoom-in">
          {/* Skeleton */}
          {loading && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-slate-700 z-10" />
          )}

          <Image
            key={selectedImage}
            src={selectedImage}
            alt={product.name}
            fill
            priority
            onLoadingComplete={() => setLoading(false)}
            className="
              object-contain p-2
              transition-transform duration-500
              group-hover:scale-110
            "
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
          />
        </div>

        {/* NAV BUTTONS */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                bg-white/70 dark:bg-slate-800/70
                backdrop-blur-md
                border border-white/30
                text-gray-800 dark:text-gray-100
                rounded-full p-3 shadow-lg
                hover:scale-110 active:scale-95 transition
              "
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                bg-white/70 dark:bg-slate-800/70
                backdrop-blur-md
                border border-white/30
                text-gray-800 dark:text-gray-100
                rounded-full p-3 shadow-lg
                hover:scale-110 active:scale-95 transition
              "
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* DOT INDICATOR */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`
                h-1 rounded-full transition-all duration-300
                ${i === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 dark:bg-gray-600'}
              `}
            />
          ))}
        </div>
      )}

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setLoading(true);
                }}
                className={`
                  relative flex-shrink-0 rounded-xl overflow-hidden
                  w-20 h-20 md:w-24 md:h-24
                  transition-all duration-200
                  ${
                    isActive
                      ? 'ring-2 ring-blue-500 scale-105 shadow-lg'
                      : 'opacity-70 hover:opacity-100'
                  }
                `}
              >
                <Image src={img.url} alt="" fill className="object-cover" sizes="100px" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
