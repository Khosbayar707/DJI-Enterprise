"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { GarminProduct } from "@/app/_types/types";

interface GarminProductCardProps {
  product: GarminProduct;
  index: number;
}

export default function GarminProductCard({
  product,
  index,
}: GarminProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
    >
      <div className="relative">
        <div className="h-64 bg-gray-100 flex justify-center items-center relative">
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority={index < 3}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.discountPrice && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, starIndex) => (
                <svg
                  key={starIndex}
                  className={`w-4 h-4 ${starIndex < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <div className="mb-4">
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <ul className="space-y-2 mb-4">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm">
                <svg
                  className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-clamp-2">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </motion.div>
  );
}
