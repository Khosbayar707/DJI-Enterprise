import { CustomGarminProduct } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  product: CustomGarminProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.length > 0 ? product.images[0].url : '/image/placeholder.jpg'
  );
  return (
    <div>
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        <div className="relative w-full h-96">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img.url)}
            className={`border rounded-md overflow-hidden ${selectedImage === img.url ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className="relative w-full h-20 bg-gray-50">
              <Image
                src={img.url}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 128px"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
