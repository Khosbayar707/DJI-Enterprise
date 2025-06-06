import { CustomGarminProduct } from "@/lib/types";
import { useState } from "react";

interface ProductGalleryProps {
  product: CustomGarminProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.length > 0 ? product.images[0].url : "/image/placeholder.jpg"
  );
  return (
    <div>
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-96 object-contain"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img.url)}
            className={`border rounded-md overflow-hidden ${selectedImage === img.url ? "ring-2 ring-blue-500" : ""}`}
          >
            <img
              src={img.url}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-20 object-contain bg-gray-50"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
