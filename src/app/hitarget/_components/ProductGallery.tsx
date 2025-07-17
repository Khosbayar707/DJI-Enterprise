import { CustomSurveyEquipment } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: CustomSurveyEquipment;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.length > 0 ? product.images[0].url : '/image/placeholder.jpg'
  );
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);

  const handleNext = () => {
    if (product.images.length > 0) {
      const nextIndex = (currentThumbIndex + 1) % product.images.length;
      setCurrentThumbIndex(nextIndex);
      setSelectedImage(product.images[nextIndex].url);
    }
  };

  const handlePrev = () => {
    if (product.images.length > 0) {
      const prevIndex = (currentThumbIndex - 1 + product.images.length) % product.images.length;
      setCurrentThumbIndex(prevIndex);
      setSelectedImage(product.images[prevIndex].url);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
        <div className="relative w-full aspect-square">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain transition-all duration-300 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            priority
          />
        </div>

        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {product.images.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
            {product.images.map((img, index) => {
              const isActive = selectedImage === img.url;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setCurrentThumbIndex(index);
                  }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'ring-2 ring-blue-600 shadow-md scale-105'
                      : 'hover:ring-2 hover:ring-blue-400 hover:scale-105'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} thumbnail ${index + 1}`}
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
