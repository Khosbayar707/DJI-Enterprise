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

  const selectedImage = images[currentIndex].url;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
      <div
        className="
          relative rounded-2xl overflow-hidden
          bg-white dark:bg-slate-900
          touch-pan-y
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="
          relative w-full
          aspect-[4/5]
          sm:aspect-square
          lg:aspect-[4/3]
        "
        >
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            priority
            className="object-contain p-4 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="
                absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                bg-white/80 dark:bg-slate-800/80
                hover:bg-white dark:hover:bg-slate-700
                text-gray-800 dark:text-gray-100
                rounded-full
                p-2 sm:p-3
                shadow-md
                transition-all duration-200
                hover:scale-110 active:scale-95
              "
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="sm:size-6" />
            </button>

            <button
              onClick={handleNext}
              className="
                absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                bg-white/80 dark:bg-slate-800/80
                hover:bg-white dark:hover:bg-slate-700
                text-gray-800 dark:text-gray-100
                rounded-full
                p-2 sm:p-3
                shadow-md
                transition-all duration-200
                hover:scale-110 active:scale-95
              "
              aria-label="Next image"
            >
              <ChevronRight size={18} className="sm:size-6" />
            </button>

            <div
              className="
              absolute top-3 left-3
              bg-black/60 dark:bg-black/70
              text-white text-xs sm:text-sm
              px-3 py-1 rounded-full
              backdrop-blur-sm
            "
            >
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="relative">
          <div className="grid grid-cols-5 grid-rows-2 gap-2 sm:hidden">
            {images.slice(0, 10).map((img, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`
              relative rounded-lg overflow-hidden
              border-2 transition-all duration-200
              aspect-square
              ${isActive ? 'border-blue-600' : 'border-gray-200 dark:border-gray-700'}
            `}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="60px" />
                </button>
              );
            })}

            {images.length > 10 && (
              <div
                className="
          flex items-center justify-center
          bg-gray-200 dark:bg-slate-700
          rounded-lg text-xs font-semibold
        "
              >
                +{images.length - 10}
              </div>
            )}
          </div>

          <div
            className="
      hidden sm:flex gap-3 overflow-x-auto
      scrollbar-hide py-2
    "
          >
            {images.map((img, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`
              relative flex-shrink-0 rounded-xl overflow-hidden
              border-2 transition-all duration-200
              w-20 h-20 md:w-24 md:h-24
              ${
                isActive
                  ? 'border-blue-600 dark:border-blue-500 scale-105 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-105'
              }
            `}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="100px" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
