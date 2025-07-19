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
import { useState } from 'react';

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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-gray-500 text-sm uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-full">
              {product.type.toLowerCase()}
            </p>

            {product.brand && (
              <p className="text-gray-600 text-sm tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
                Бренд: {product.brand}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-3xl font-bold text-gray-900">{formatTugrug(product.price)}</span>
      </div>

      {product.features.length > 0 && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-900 text-lg">Гол онцлогууд:</h3>
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
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

      <div className="space-y-3 pt-2">
        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg font-medium border-2 transition-all duration-200 bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400"
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
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Техникийн үзүүлэлтүүд:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, index) => (
              <motion.div
                key={index}
                className="flex gap-3 items-baseline p-2 hover:bg-gray-50 rounded-lg transition-colors"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-gray-500 font-medium text-sm min-w-[120px]">
                  {spec.label}:
                </span>
                <span className="text-gray-700 font-medium">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
