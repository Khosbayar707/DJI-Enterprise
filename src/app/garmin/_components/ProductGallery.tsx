import { CustomGarminProduct } from '@/lib/types';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: CustomGarminProduct;
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
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const thumbContainer = document.getElementById('thumbnails-container');
    const activeThumb = document.querySelector('[aria-current="true"]');
    if (thumbContainer && activeThumb) {
      const containerWidth = thumbContainer.clientWidth;
      const thumb = activeThumb as HTMLElement;
      const thumbOffset = thumb.offsetLeft;
      const thumbWidth = thumb.offsetWidth;
      thumbContainer.scrollTo({
        left: thumbOffset - (containerWidth - thumbWidth) / 2,
        behavior: 'smooth',
      });
    }
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 z-10 md:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="sm:size-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 z-10 md:right-4"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="sm:size-6" />
            </button>
          </>
        )}

        {product.images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm z-10">
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
