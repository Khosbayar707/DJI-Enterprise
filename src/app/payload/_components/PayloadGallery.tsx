'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CustomPayload } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PayloadGalleryProps {
  payload: CustomPayload;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function PayloadGallery({
  payload,
  autoSlide = false,
  autoSlideInterval = 5000,
}: PayloadGalleryProps) {
  const images =
    Array.isArray(payload.images) && payload.images.length > 0
      ? payload.images
      : [
          {
            url: typeof payload.images === 'string' ? payload.images : '/image/placeholder.jpg',
            public_id: 'fallback',
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;

    const slideInterval = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [currentIndex, autoSlide, autoSlideInterval, images.length]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex].url);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex].url);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(images[index].url);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full aspect-square cursor-pointer">
          <Image
            src={selectedImage}
            alt={payload.name}
            fill
            className={cn(
              'object-contain transition-all duration-300',
              isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in group-hover:opacity-90'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            priority
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {!isZoomed && (
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label="Zoom image"
            >
              <ZoomIn size={24} />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label="Өмнөх зураг"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label="Дараагийн зураг"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
            {images.map((img, index) => {
              const isActive = selectedImage === img.url;
              return (
                <button
                  key={img.public_id || index}
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200',
                    isActive
                      ? 'ring-2 ring-blue-600 shadow-md scale-105'
                      : 'hover:ring-2 hover:ring-blue-400 hover:scale-105'
                  )}
                  aria-label={`${index + 1} дэх зураг харах`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <Image
                    src={img.url}
                    alt={`${payload.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {isActive && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
