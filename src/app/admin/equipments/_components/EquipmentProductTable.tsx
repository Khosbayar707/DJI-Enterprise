'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomSurveyEquipment } from '@/lib/types';
import AddSurveyEquipment from './add-product/add-equipment-product';
import EditSurveyEquipmentDialog from './edit-product/EditEquipmentDialog';
import { formatPrice } from '../../garmin/utlis/format-price';
import DeleteSurveyEquipment from './delete-product/delete-survey-product-buttom';

export default function SurveyProductTable() {
  const [products, setProducts] = useState<CustomSurveyEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [editingProduct, setEditingProduct] = useState<CustomSurveyEquipment | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/hitargets');
      if (response.data.success) {
        setProducts(response.data.data.equipment);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="p-6 from-gray-50 to-gray-100 min-h-screen">
      <div className="mx-auto">
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-xl shadow-sm p-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Хэмжилтийн төхөөрөмж</h1>
              <p className="text-gray-500 mt-1">Хяналтын самбар</p>
            </div>
            <AddSurveyEquipment setRefresh={setRefresh} />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader>
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-16 mt-4 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300"
            >
              <div className="mb-6">
                <svg
                  className="h-16 w-16 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8ZM3.3 7l8.7 5 8.7-5M12 22V12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Төхөөрөмж олдсонгүй</h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Одоогоор жагсаалт хоосон байна. Та доорх товчийг дарж шинэ төхөөрөмж нэмнэ үү.
              </p>
              <AddSurveyEquipment setRefresh={setRefresh} />
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card className="relative group hover:shadow-md transition-all duration-300 border border-gray-200 h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 mr-2">Төрөл:</span>
                            <Badge variant="outline">{product.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 mr-2">Үнэ:</span>
                            <span className="text-gray-900 font-medium">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => setEditingProduct(product)}
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Засах
                        </Button>
                        <DeleteSurveyEquipment productId={product.id} setRefresh={setRefresh} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {editingProduct && (
        <EditSurveyEquipmentDialog
          product={editingProduct}
          setRefresh={setRefresh}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
