import { CustomSurveyEquipment } from '@/lib/types';
import { MessageSquare, ChevronRight, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useMemo } from 'react';

function formatTugrug(amount: number): string {
  return amount.toLocaleString('mn-MN') + ' ₮';
}

interface ProductInfoProps {
  product: CustomSurveyEquipment;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function ProductInfo({ product, onContactClick, isLoading }: ProductInfoProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const storeInfo = {
    name: 'Инженер Геодези ХХК',
    phone: '+976 9000 5559',
    location:
      'Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот, "Инженер Геодези ХХК" байр',
    workingHours: 'Даваа-Баасан: 09:00-18:00, Бямба-Ням: Амарна',
  };

  const stockPill = useMemo(() => {
    const base =
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-sm font-medium shadow-sm border';
    if (product.stock > 10) {
      return {
        cls: `${base} bg-green-50 text-green-700 border-green-300`,
        text: `Бэлэн: ${product.stock} ш`,
        icon: 'check',
      };
    }
    if (product.stock > 0) {
      return {
        cls: `${base} bg-amber-50 text-amber-700 border-amber-300`,
        text: `Үлдэгдэл: ${product.stock} ш`,
        icon: 'warn',
      };
    }
    return {
      cls: `${base} bg-red-50 text-red-700 border-red-300`,
      text: 'Түр дууссан',
      icon: 'info',
    };
  }, [product.stock]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-gray-600 text-[11px] sm:text-xs uppercase tracking-wider bg-gray-100 px-2 sm:px-2.5 py-0.5 rounded-full">
              {product.type.toLowerCase()}
            </p>
            {product.brand && (
              <p className="text-gray-700 text-[11px] sm:text-xs tracking-wider bg-blue-50 px-2 sm:px-2.5 py-0.5 rounded-full">
                Брэнд: {product.brand}
              </p>
            )}

            {product.stock > 0 && product.stock <= 5 && (
              <span className="sm:hidden inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V6h2v4H9zm0 4v-2h2v2H9z" />
                </svg>
                Үлдэгдэл бага
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={stockPill.cls}>
            {stockPill.icon === 'check' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {stockPill.icon === 'warn' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-amber-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V6h2v4H9zm0 4v-2h2v2H9z" />
              </svg>
            )}
            {stockPill.icon === 'info' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {stockPill.text}
          </span>

          {product.stock > 0 && product.stock <= 5 && (
            <div className="hidden sm:flex items-center gap-1 text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-amber-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V6h2v4H9zm0 4v-2h2v2H9z" />
              </svg>
              <span>Яараарай, үлдэгдэл бага байна!</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
          {formatTugrug(product.price)}
        </span>
      </div>

      {product.features.length > 0 && (
        <div className="space-y-4 bg-gray-50 p-3 sm:p-4 rounded-xl">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Гол онцлогууд:</h3>
          <ul className="space-y-2 sm:space-y-3">
            {(product.features.length > 3 ? product.features.slice(0, 3) : product.features).map(
              (feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="text-blue-500 mr-2 mt-1">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </motion.li>
              )
            )}
            {product.features.length > 3 && (
              <div className="hidden md:block">
                <ul className="mt-1 space-y-2">
                  {product.features.slice(3).map((feature, idx) => (
                    <motion.li
                      key={`more-${idx}`}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (idx + 3) * 0.04 }}
                    >
                      <span className="text-blue-500 mr-2 mt-1">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}

      <div className="pt-1 sm:pt-2">
        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              disabled={isLoading}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 gap-3 cursor-pointer bg-gradient-to-r from-blue-600 to-black text-white font-semibold text-base rounded-lg transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:from-black hover:to-black active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5" />
              Худалдагчтай холбогдох
            </motion.button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Худалдагчийн мэдээлэл</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{storeInfo.name}</h4>
                  <p className="text-gray-600">{storeInfo.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Холбогдох утас</h4>
                  <a href={`tel:${storeInfo.phone}`} className="text-blue-600 hover:underline">
                    {storeInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Ажиллах цаг</h4>
                  <p className="text-gray-600">{storeInfo.workingHours}</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
                >
                  Хаах
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {product.specifications.length > 0 && (
        <div className="pt-5 sm:pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">
            Техникийн үзүүлэлтүүд:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {product.specifications.map((spec, index) => (
              <motion.div
                key={index}
                className="flex gap-3 items-baseline p-2 hover:bg-gray-50 rounded-lg transition-colors"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <span className="text-gray-500 font-medium text-xs sm:text-sm min-w-[110px] sm:min-w-[120px]">
                  {spec.label}:
                </span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
