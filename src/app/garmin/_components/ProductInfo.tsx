import { GarminProduct, Product } from "@/app/_types/types";

interface ProductInfoProps {
  product: GarminProduct;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function ProductInfo({
  product,
  onContactClick,
  isLoading,
}: ProductInfoProps) {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>
        </div>
        {product.isNew && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      <div className="flex items-center mt-4">
        <div className="flex">
          {[...Array(5)].map((_, starIndex) => (
            <svg
              key={starIndex}
              className={`w-5 h-5 ${starIndex < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-600 text-sm ml-2">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-6">
        {product.discountPrice ? (
          <div>
            <span className="text-3xl font-bold text-gray-900">
              {product.discountPrice}
            </span>
            <span className="text-lg text-gray-500 line-through ml-2">
              {product.price}
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold text-gray-900">
            {product.price}
          </span>
        )}
      </div>

      <div className="mt-8">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          disabled={!product.inStock}
        >
          {product.inStock ? "Сагсанд хийх" : "Дууссан"}
        </button>
        <button
          className="w-full mt-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200"
          onClick={onContactClick}
          disabled={isLoading}
        >
          {isLoading ? "Ачааллаж байна..." : "Холбоо барих"}
        </button>
      </div>
    </div>
  );
}
