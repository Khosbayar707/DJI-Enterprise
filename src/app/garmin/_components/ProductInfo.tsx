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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      {/* TITLE */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {product.name}
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          {product.partNumber && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
              <span className="text-xs text-gray-500 dark:text-gray-400">PN</span>
              <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                {product.partNumber}
              </span>
              <button
                onClick={handleCopyPN}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                {copiedPN ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          )}

          <span className="px-3 py-1.5 text-xs rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {product.type}
          </span>
        </div>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
          {hasHalfStar && <StarHalf className="w-5 h-5 text-amber-400 fill-amber-400" />}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
          ))}
        </div>
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {product.rating.toFixed(1)} ({product.reviewCount})
        </span>
      </div>

      {/* PRICE */}
      <div>
        {product.discountPrice ? (
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {formatTugrug(product.discountPrice)}
            </span>
            <span className="line-through text-gray-400">{formatTugrug(product.price)}</span>
          </div>
        ) : (
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {formatTugrug(product.price)}
          </span>
        )}
      </div>

      {/* FEATURES */}
      {product.features.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Үндсэн онцлогууд
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {product.features.slice(0, 6).map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT BUTTON */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogTrigger asChild>
          <button
            onClick={onContactClick}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition"
          >
            Худалдагчтай холбогдох
          </button>
        </DialogTrigger>

        <DialogContent className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Худалдагчийн мэдээлэл</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
              <h4 className="font-semibold">{storeInfo.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{storeInfo.location}</p>
              <p className="text-sm mt-1">{storeInfo.workingHours}</p>
            </div>

            <a
              href={`tel:${storeInfo.phone}`}
              className="block text-center py-3 rounded-lg bg-green-600 text-white font-medium"
            >
              {storeInfo.phone} — Дуудах
            </a>

            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full py-3 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
            >
              Хаах
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* SPECIFICATIONS */}
      {product.specifications.length > 0 && (
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Техникийн үзүүлэлтүүд
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {spec.label}
                </span>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
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
