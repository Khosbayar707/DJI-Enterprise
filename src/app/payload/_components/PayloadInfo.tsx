'use client';

import { MessageSquare, ChevronRight, Phone, MapPin, Clock, Mail, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CustomPayload } from '@/lib/types';
import { Button } from '@/components/ui/button';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(amount);
}

interface PayloadInfoProps {
  payload: CustomPayload;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function PayloadInfo({ payload, onContactClick, isLoading }: PayloadInfoProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const storeInfo = {
    name: 'DJI Enterprise Албан ёсны дистрибьютер',
    phone: '+976 9000 5559',
    location:
      'Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот, "Инженер Геодези ХХК" байр',
    workingHours: 'Даваа-Баасан: 09:00-18:00, Бямба-Ням: Амарна',
    email: 'dji@geo-mongol.mn',
    rating: 4.8,
    reviews: 124,
  };

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(storeInfo.rating);
    const hasHalfStar = storeInfo.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />);
      }
    }

    return stars;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          {payload.name}
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {payload.type.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {formatCurrency(payload.price)}
        </span>
      </div>

      {payload.features.length > 0 && (
        <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Гол онцлогууд:</h3>
          <ul className="space-y-3">
            {payload.features.slice(0, 5).map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-blue-500 dark:text-blue-400 mr-2.5 mt-0.5">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={onContactClick}
              disabled={isLoading}
              className="w-full px-6 py-6 gap-3 cursor-pointer bg-gradient-to-r from-blue-600 to-black dark:from-blue-600 dark:to-gray-800 text-white font-semibold text-base rounded-lg transition-all duration-800 ease-in-out shadow-md hover:shadow-lg hover:from-black dark:hover:from-gray-800 hover:to-black dark:hover:to-gray-800 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5" />
              Худалдагчтай холбогдох
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-lg dark:bg-gray-900 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Худалдагчийн мэдээлэл</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{storeInfo.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{storeInfo.location}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <div className="flex">{renderRatingStars()}</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {storeInfo.rating} ({storeInfo.reviews} шүүмж)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Холбогдох утас</h4>
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
                  >
                    {storeInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2.5 rounded-full flex-shrink-0">
                  <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">И-мэйл</h4>
                  <a
                    href={`mailto:${storeInfo.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {storeInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-full flex-shrink-0">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Ажиллах цаг</h4>
                  <p className="text-gray-600 dark:text-gray-400">{storeInfo.workingHours}</p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsContactModalOpen(false)}
                  variant="outline"
                  className="w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Хаах
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {payload.description && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">
            Бүтээгдэхүүний дэлгэрэнгүй:
          </h3>
          <div className="prose prose-sm text-gray-700 dark:text-gray-300 max-w-none dark:prose-invert">
            {payload.description.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
