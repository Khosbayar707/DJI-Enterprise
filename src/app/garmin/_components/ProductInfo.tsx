import { CustomGarminProduct } from '@/lib/types';
import { ShoppingCart, MessageSquare, Star, StarHalf } from 'lucide-react';

function formatTugrug(amount: number): string {
  return amount.toLocaleString('mn-MN') + ' ₮';
}

interface ProductInfoProps {
  product: CustomGarminProduct;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function ProductInfo({ product, onContactClick, isLoading }: ProductInfoProps) {
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-wider">
            {product.type.toLowerCase()}
          </p>
        </div>
        {product.isNew && (
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Шинэ
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
          {hasHalfStar && (
            <StarHalf key="half" className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
          ))}
        </div>
        <span className="text-gray-600 text-sm">
          {product.rating.toFixed(1)} ({product.reviewCount} үнэлгээ)
        </span>
      </div>

      <div className="space-y-2">
        {product.discountPrice ? (
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatTugrug(product.discountPrice)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              {formatTugrug(product.price)}
            </span>
            {product.discountPrice < product.price && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-1 rounded-full">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% хямдрал
              </span>
            )}
          </div>
        ) : (
          <span className="text-3xl font-bold text-gray-900">{formatTugrug(product.price)}</span>
        )}
        <p className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? '✅ Бэлэн байгаа' : '❌ Одоогоор нөөцгүй'}
        </p>
      </div>

      {product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-lg">Гол онцлогууд:</h3>
          <ul className="space-y-2.5">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 pt-2">
        <button
          className={`w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg font-medium transition-all duration-200 ${
            product.inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-[0.98]'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-5 h-5" />
          {product.inStock ? 'Сагсанд нэмэх' : 'Нөөцгүй'}
        </button>

        <button
          onClick={onContactClick}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg font-medium border-2 transition-all duration-200 ${
            isLoading
              ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-wait'
              : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400 active:scale-[0.98]'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          {isLoading ? 'Уншиж байна...' : 'Худалдагчтай холбогдох'}
        </button>
      </div>

      {product.specifications.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Техникийн үзүүлэлтүүд:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.slice(0, 4).map((spec, index) => (
              <div key={index} className="flex gap-3 items-baseline">
                <span className="text-gray-500 font-medium text-sm min-w-[120px]">
                  {spec.label}:
                </span>
                <span className="text-gray-700 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
