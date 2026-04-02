'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  X,
  AlertTriangle,
  Plus,
  Minus,
} from 'lucide-react';
import Link from 'next/link';
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  garmin?: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
    partNumber?: string;
  };
  drone?: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
    partNumber?: string;
  };
}

interface Cart {
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();

      if (data.success) {
        setCart(data.data.cart);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setToast({
        open: true,
        message: 'Сагс ачаалахад алдаа гарлаа',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch('/api/cart/update', {
        method: 'POST',
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      const data = await res.json();
      if (data.success) {
        fetchCart();
        window.dispatchEvent(new Event('cart-updated'));
        setToast({
          open: true,
          message: 'Сагс шинэчлэгдлээ',
          severity: 'success',
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message: 'Шинэчлэхэд алдаа гарлаа',
        severity: 'error',
      });
    }
  };

  const openDeleteDialog = (item: CartItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setRemovingId(itemToDelete.id);
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        body: JSON.stringify({ itemId: itemToDelete.id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchCart();
        window.dispatchEvent(new Event('cart-updated'));
        setToast({
          open: true,
          message: 'Бүтээгдэхүүн сагснаас хасагдлаа',
          severity: 'success',
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message: 'Хасахад алдаа гарлаа',
        severity: 'error',
      });
    } finally {
      setRemovingId(null);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Сагс ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Сагс хоосон байна</h2>
          <p className="text-gray-500 mb-6">
            Та бүтээгдэхүүн нэмж худалдан авалтаа эхлүүлэх боломжтой
          </p>
          <Link href="/garmin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Худалдан авалт эхлэх
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Үргэлжлүүлэн худалдан авах</span>
            </Link>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Таны сагс
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {cart.items.length} бүтээгдэхүүн
              </span>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.items.map((item: CartItem, index: number) => {
                  const product = item.garmin || item.drone;
                  if (!product) return null;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <img
                              src={product.images?.[0]?.url || '/placeholder-image.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                            {item.quantity > 1 && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {item.quantity}
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                  {product.name}
                                </h3>
                                {product.partNumber && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                    PN: {product.partNumber}
                                  </p>
                                )}
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {(item.price * item.quantity).toLocaleString()}₮
                                </p>
                                <p className="text-sm text-gray-500 line-through">
                                  {item.quantity > 1 &&
                                    `${(item.price * item.quantity).toLocaleString()}₮`}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                  <button
                                    onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-semibold min-w-[32px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                                    className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Нэгж үнэ: {item.price.toLocaleString()}₮
                                </span>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openDeleteDialog(item)}
                                disabled={removingId === item.id}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                              >
                                {removingId === item.id ? (
                                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    Захиалгын хураангуй
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>
                        Нийт бүтээгдэхүүн (
                        {cart.items.reduce((sum, item) => sum + item.quantity, 0)} ширхэг)
                      </span>
                      <span>
                        {cart.items
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString()}
                        ₮
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Хүргэлтийн зардал</span>
                      <span className="text-green-600">Үнэгүй</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>НӨАТ</span>
                      <span>Багтсан</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Нийт төлөх</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {total.toLocaleString()}₮
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Худалдан авах
                  </motion.button>

                  {/* Shipping Info */}
                  <div className="mt-6 space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Үнэгүй хүргэлт</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>1 жилийн баталгаат хугацаа</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '8px',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Бүтээгдэхүүн хасах
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Та "{itemToDelete?.garmin?.name || itemToDelete?.drone?.name}" бүтээгдэхүүнийг сагснаас
            хасахдаа итгэлтэй байна уу?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Болих
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained" autoFocus>
            Хасах
          </Button>
        </DialogActions>
      </Dialog>

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
