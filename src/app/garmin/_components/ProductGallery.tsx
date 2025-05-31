import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-96 object-contain"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border rounded-md overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
          >
            <img
              src={img}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-20 object-contain bg-gray-50"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
