"use client";
import { Drone } from "@/app/_types/types";
import { useState } from "react";

interface ProductGalleryProps {
  mainImage: Drone["mainImage"];
  images: Drone["images"];
  name: Drone["name"];
  discountPrice?: Drone["discountPrice"];
}

export default function ProductGallery({
  mainImage,
  images,
  name,
  discountPrice,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);
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
        <img
          src={selectedImage}
          alt={`${name} preview`}
          className={`w-full h-auto max-h-[500px] object-cover transition-all duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
          style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
        />
        {discountPrice && (
          <div className="absolute top-4 left-4 bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow-md animate-pulse">
            Хямдрал
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
              selectedImage === img
                ? "ring-2 ring-blue-600"
                : "hover:ring-2 hover:ring-blue-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-20 object-cover"
            />
            {selectedImage === img && (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
