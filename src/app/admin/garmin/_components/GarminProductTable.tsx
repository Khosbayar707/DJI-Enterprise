"use client";
import { useState, useEffect } from "react";
import AddGarminProduct from "./add-product/add-garmin-product";
import EditProductDialog from "./edit-product/EditProductDialog";
import { GarminProduct } from "@/generated/prisma";
import axios from "axios";
import DeleteGarmin from "./delete-product/delete-garmin-product-buttom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "../utlis/format-price";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomGarminProduct } from "@/lib/types";

export default function GarminProductTable() {
  const [products, setProducts] = useState<CustomGarminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [editingProduct, setEditingProduct] =
    useState<CustomGarminProduct | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/garmins");
      if (response.data.success) {
        setProducts(response.data.data.products);
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
        ease: "easeOut",
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
              <h1 className="text-3xl font-bold text-gray-900">
                Гармин бүтээгдэхүүн
              </h1>
              <p className="text-gray-500 mt-1">Гармин хянах хэсэг</p>
            </div>
            <AddGarminProduct setRefresh={setRefresh} />
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
              className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm"
            >
              <div className="h-16 w-16 text-gray-400 mb-4 flex items-center justify-center">
                <svg
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
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Одоогоор бүртгэгдсэн бүтээгдэхүүн байхгүй.
              </h3>
              <p className="text-gray-500 mb-6 max-w-md text-center">Нэмэх</p>
              <AddGarminProduct setRefresh={setRefresh} />
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
                            <span className="text-sm font-medium text-gray-500 mr-2">
                              Төрөл:
                            </span>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>

                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 mr-2">
                              Үнэ:
                            </span>
                            <span className="text-gray-900 font-medium">
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 mr-2">
                              Байгаа эсэх:
                            </span>
                            <Badge
                              variant={
                                product.inStock ? "default" : "destructive"
                              }
                            >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
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
                          Засварлах
                        </Button>

                        <DeleteGarmin
                          productId={product.id}
                          setRefresh={setRefresh}
                        />
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
        <EditProductDialog
          product={editingProduct}
          setRefresh={setRefresh}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
