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
  Truck,
  Shield,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isVisible, setIsVisible] = useState(false);
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopyPN = () => {
    navigator.clipboard.writeText(product.partNumber || '');
    setCopiedPN(true);
    setTimeout(() => setCopiedPN(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Badges and Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {product.partNumber && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                >
                  <span className="text-xs font-medium text-gray-500">PN</span>
                  <span className="font-mono text-sm font-semibold text-gray-800">
                    {product.partNumber}
                  </span>
                  <button
                    onClick={handleCopyPN}
                    className="ml-2 p-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {copiedPN ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>
                </motion.div>
              )}

              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                {product.type}
              </span>

              {product.isNew && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-sm"
                >
                  ШИНЭ
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 animate-pulse opacity-50" />
                </motion.span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium shadow-sm
                ${
                  product.stock > 10
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200'
                    : product.stock > 0
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200'
                      : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200'
                }
              `}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    product.stock > 10
                      ? 'bg-emerald-500'
                      : product.stock > 0
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                />
                {product.stock > 10 ? (
                  <>
                    <span className="font-semibold">{product.stock} ширхэг</span>
                    <span className="text-xs opacity-80">Бэлэн</span>
                  </>
                ) : product.stock > 0 ? (
                  <>
                    <span className="font-semibold">{product.stock} ширхэг</span>
                    <span className="text-xs opacity-80">Үлдэгдэл</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">Түр дууссан</span>
                  </>
                )}
              </div>

              {product.stock > 0 && product.stock <= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                    <AlertCircle className="w-3 h-3" />
                    <span>Яараарай!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Rating */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-2 rounded-lg border border-amber-100">
            <div className="flex items-center mr-2">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
              {hasHalfStar && (
                <StarHalf key="half" className="w-5 h-5 text-amber-400 fill-amber-400" />
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                {product.rating.toFixed(1)}
                <span className="text-sm font-normal text-gray-500">/5.0</span>
              </span>
              <span className="text-xs text-gray-500">({product.reviewCount} үнэлгээ)</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Баталгаатай</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">Хүргэлт</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Price Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-wrap items-baseline gap-3">
          {product.discountPrice ? (
            <>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formatTugrug(product.discountPrice)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {formatTugrug(product.price)}
                </span>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg"
              >
                <span className="relative z-10">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% ХЯМДРАЛ
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 animate-pulse opacity-50" />
              </motion.span>
            </>
          ) : (
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {formatTugrug(product.price)}
            </span>
          )}
        </div>

        {product.discountPrice && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Хэмнэлт: {formatTugrug(product.price - product.discountPrice)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Key Features */}
      {product.features.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <h3 className="text-xl font-bold text-gray-900">Үндсэн онцлогууд</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-200 transition-colors">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {feature}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contact Button */}
      <motion.div variants={itemVariants} className="space-y-4">
        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
          <DialogTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              disabled={isLoading}
              className="relative w-full px-8 py-5 gap-3 cursor-pointer bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-70 flex items-center justify-center group overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-20" />

              <div className="relative z-10 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">Худалдагчтай холбогдох</span>
              </div>

              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg rounded-2xl border-none shadow-2xl">
            <DialogHeader className="pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Худалдагчийн мэдээлэл
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">Албан ёсны дистрибьютер</p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-6">
              {/* Store Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{storeInfo.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{storeInfo.rating}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{storeInfo.reviews} үнэлгээ</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 font-medium rounded-full text-sm">
                    Албан ёсны
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Хаяг</h5>
                      <p className="text-gray-600 mt-1">{storeInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Холбогдох утас</h5>
                      <a
                        href={`tel:${storeInfo.phone}`}
                        className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {storeInfo.phone}
                      </a>
                    </div>
                    <a
                      href={`tel:${storeInfo.phone}`}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Дуудах
                    </a>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-amber-200 transition-colors">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Ажиллах цаг</h5>
                      <p className="text-gray-600 mt-1">{storeInfo.workingHours}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                >
                  Хаах
                </button>
                <a
                  href={`tel:${storeInfo.phone}`}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow text-center"
                >
                  Утасдах
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Specifications */}
      {product.specifications.length > 0 && (
        <motion.div variants={itemVariants} className="pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h3 className="text-xl font-bold text-gray-900">Техникийн үзүүлэлтүүд</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.specifications.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="group p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {spec.value}
                      </span>
                    </div>
                    <div className="p-1.5 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
