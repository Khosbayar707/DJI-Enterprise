'use client';

import { CustomGarminProduct } from '@/lib/types';
import {
  Star,
  StarHalf,
  ChevronRight,
  Copy,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  Package,
  Shield,
  Truck,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

function formatTugrug(amount: number): string {
  return amount.toLocaleString('mn-MN') + ' ₮';
}

interface ProductInfoProps {
  product: CustomGarminProduct;
  onContactClick: () => void;
  isLoading: boolean;
}

export default function ProductInfo({ product, onContactClick, isLoading }: ProductInfoProps) {
  const [copiedPN, setCopiedPN] = useState(false);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleCopyPN = () => {
    navigator.clipboard.writeText(product.partNumber || '');
    setCopiedPN(true);
    setTimeout(() => setCopiedPN(false), 2000);
  };

  const handleAddToCart = async () => {
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        garminId: product.id,
        quantity: qty,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setToast({
        open: true,
        message: 'Сагсанд нэмэгдлээ 🛒',
        severity: 'success',
      });

      window.dispatchEvent(new Event('cart-updated'));
    } else {
      setToast({
        open: true,
        message: 'Алдаа гарлаа',
        severity: 'error',
      });
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQty((q) => Math.max(1, Math.min(99, q + delta)));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {product.partNumber && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part Number
                </span>
                <span className="font-mono text-sm font-semibold">{product.partNumber}</span>
                <button
                  onClick={handleCopyPN}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copiedPN ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )}

            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {product.type}
            </span>

            {/* Stock Status Badge */}
            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Бэлэн
            </span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            {hasHalfStar && <StarHalf className="w-5 h-5 text-amber-400 fill-amber-400" />}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            ))}
          </div>
          <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviewCount} сэтгэгдэл)
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          {product.discountPrice ? (
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatTugrug(product.discountPrice)}
              </span>
              <span className="text-lg line-through text-gray-400">
                {formatTugrug(product.price)}
              </span>
              <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">
                -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
              </span>
            </div>
          ) : (
            <span className="text-4xl font-bold">{formatTugrug(product.price)}</span>
          )}

          {/* Tax Info */}
          <p className="text-xs text-gray-500 dark:text-gray-400">НӨАТ багтсан үнэ</p>
        </div>

        {/* Features Grid */}
        {product.features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Онцлог шинж чанарууд
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.features.slice(0, 6).map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Тоо ширхэг</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={qty <= 1}
                className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg min-w-[40px] text-center">{qty}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={qty >= 99}
                className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Нийт:{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatTugrug((product.discountPrice || product.price) * qty)}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Сагсанд нэмэх
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            disabled={isLoading}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <MessageCircle className="w-5 h-5" />
            )}
            Худалдагчтай холбогдох
          </motion.button>
        </div>

        {/* Shipping & Returns Info */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Хүргэлт</p>
              <p className="text-sm font-medium">Үнэгүй</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Батлан баталгаа</p>
              <p className="text-sm font-medium">1 жил</p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications.length > 0 && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Техникийн үзүүлэлтүүд
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.specifications.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <div className="font-semibold mt-1 text-gray-900 dark:text-white">
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          zIndex: 99999,
          mt: '80px',
        }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant="filled"
          sx={{ borderRadius: '12px' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
