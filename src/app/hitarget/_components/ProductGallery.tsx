import { CustomSurveyEquipment } from '@/lib/types';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: CustomSurveyEquipment;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.length > 0 ? product.images[0].url : '/image/placeholder.jpg'
  );
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setTouchStart(null);
  };

  const handleNext = useCallback(() => {
    if (product.images.length > 0) {
      const nextIndex = (currentThumbIndex + 1) % product.images.length;
      setCurrentThumbIndex(nextIndex);
      setSelectedImage(product.images[nextIndex].url);
    }
  }, [currentThumbIndex, product.images]);

  const handlePrev = useCallback(() => {
    if (product.images.length > 0) {
      const prevIndex = (currentThumbIndex - 1 + product.images.length) % product.images.length;
      setCurrentThumbIndex(prevIndex);
      setSelectedImage(product.images[prevIndex].url);
    }
  }, [currentThumbIndex, product.images]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const container = document.getElementById('thumbnails-container');
    const activeThumb = document.querySelector('[aria-current="true"]');
    if (!container || !activeThumb) return;

    const wrap = container as HTMLElement;
    const thumb = activeThumb as HTMLElement;
    const centerLeft = thumb.offsetLeft - (wrap.clientWidth - thumb.offsetWidth) / 2;

    wrap.scrollTo({ left: centerLeft, behavior: 'smooth' });
  }, [currentThumbIndex]);

  return (
    <div className="space-y-4">
      <div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full aspect-square">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 50vw, 800px"
            priority
          />
        </div>

        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {product.images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs sm:text-sm px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
            {currentThumbIndex + 1} / {product.images.length}
          </div>
        )}
      </div>

      {product.images.length > 1 && (
        <div className="relative">
          <div
            id="thumbnails-container"
            className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1 -mx-1"
          >
            {product.images.map((img, index) => {
              const isActive = selectedImage === img.url;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setCurrentThumbIndex(index);
                  }}
                  className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                    isActive
                      ? 'border-blue-600 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-blue-400 hover:scale-105 active:scale-95'
                  }`}
                  style={{
                    width: 'clamp(70px, 20vw, 90px)',
                    height: 'clamp(70px, 20vw, 90px)',
                  }}
                  aria-label={`View image ${index + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 20vw, 80px"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-600/20 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-8 h-full pointer-events-none md:hidden" />
        </div>
      )}
    </div>
  );
}
