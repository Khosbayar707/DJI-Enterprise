import { CustomGarminProduct } from '@/lib/types';
import {
  MessageSquare,
  Star,
  StarHalf,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Copy,
  Check,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';

function formatTugrug(amount: number): string {
  return amount.toLocaleString('mn-MN') + ' ₮';
}

interface ProductInfoProps {
  product: CustomGarminProduct;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function ProductInfo({ product, onContactClick, isLoading }: ProductInfoProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedPN, setCopiedPN] = useState(false);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const storeInfo = {
    name: 'DJI Enterprise Албан ёсны дистрибьютер',
    phone: '+976 9000 5559',
    location: 'Улаанбаатар хот, Баянгол дүүрэг, Амарсанаагийн гудамж 52',
    workingHours: 'Даваа-Баасан: 09:00-18:00',
    rating: 4.8,
    reviews: 124,
  };

  useEffect(() => {}, []);

  const handleCopyPN = () => {
    navigator.clipboard.writeText(product.partNumber || '');
    setCopiedPN(true);
    setTimeout(() => setCopiedPN(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 sm:space-y-10"
    >
      <div className="space-y-4">
        <h1
          className="
      text-2xl sm:text-3xl lg:text-4xl
      font-bold
      text-gray-900 dark:text-gray-100
      leading-tight
    "
        >
          {product.name}
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          {product.partNumber && (
            <div
              className="
          flex items-center gap-2
          px-3 py-1.5 rounded-lg
          border border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-slate-800
        "
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">PN</span>
              <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                {product.partNumber}
              </span>
              <button
                onClick={handleCopyPN}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              >
                {copiedPN ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          )}

          <span
            className="
        px-3 py-1.5 text-xs rounded-full
        border border-blue-200 dark:border-blue-700
        bg-blue-50 dark:bg-blue-900/30
        text-blue-700 dark:text-blue-300
      "
          >
            {product.type}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
          {hasHalfStar && <StarHalf className="w-5 h-5 text-amber-400 fill-amber-400" />}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
          ))}
        </div>

        <span className="text-sm text-gray-600 dark:text-gray-400">
          {product.rating.toFixed(1)} ({product.reviewCount})
        </span>
      </div>

      <div>
        {product.discountPrice ? (
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
            <span
              className="
          text-3xl sm:text-4xl
          font-bold
          text-gray-900 dark:text-gray-100
        "
            >
              {formatTugrug(product.discountPrice)}
            </span>
            <span
              className="
          line-through
          text-gray-400
          text-lg sm:text-xl
        "
            >
              {formatTugrug(product.price)}
            </span>
          </div>
        ) : (
          <span
            className="
        text-3xl sm:text-4xl
        font-bold
        text-gray-900 dark:text-gray-100
      "
          >
            {formatTugrug(product.price)}
          </span>
        )}
      </div>

      {product.features.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Үндсэн онцлогууд
          </h3>

          <div
            className="
        grid gap-3
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
          >
            {product.features.slice(0, 6).map((feature, index) => (
              <div
                key={index}
                className="
              p-4 rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-slate-800
              transition hover:shadow-md
            "
              >
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={onContactClick}
          disabled={isLoading}
          className="
        w-full sm:max-w-md
        py-4 rounded-xl
        bg-gradient-to-r from-blue-600 to-purple-600
        text-white font-semibold text-base sm:text-lg
        hover:opacity-90 transition
      "
        >
          Худалдагчтай холбогдох
        </button>
      </div>

      {product.specifications.length > 0 && (
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Техникийн үзүүлэлтүүд
          </h3>

          <div
            className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
      "
          >
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className="
              p-4 rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-slate-800
            "
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {spec.label}
                </span>

                <div
                  className="
              text-sm font-semibold
              text-gray-900 dark:text-gray-100
              mt-1
            "
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
