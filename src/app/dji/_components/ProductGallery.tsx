'use client';
import { CustomDroneClient } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';

type ProductGalleryProps = {
  drone: CustomDroneClient;
};

export default function ProductGallery({ drone }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    drone.images.length > 0 ? drone.images[0].url : '/image/placeholder.jpg'
  );
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      const target = e.currentTarget;
      const { left, top, width, height } = target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
      setIsZoomed(true);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseMove={handleImageHover}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div className="relative w-full h-[500px]">
          <Image
            src={selectedImage}
            alt="preview"
            fill
            className={`object-cover transition-all duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
            priority
          />
        </div>
        {drone.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow-md animate-pulse">
            Хямдрал
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {drone.images.length > 0 &&
          drone.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img.url)}
              className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                selectedImage === img.url
                  ? 'ring-2 ring-blue-500 shadow-md scale-105'
                  : 'hover:ring-2 hover:ring-blue-300'
              }`}
            >
              <div className="relative w-full h-20">
                <Image
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              {selectedImage === img.url && (
                <div className="absolute inset-0 ring-2 ring-blue-500 rounded-lg pointer-events-none"></div>
              )}
            </button>
          ))}
      </div>
    </div>
  );
}
