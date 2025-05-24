import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  name: string;
  description: string;
  image: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  buttonText?: string;
  buttonClassName?: string;
  cardClassName?: string;
}

export default function ProductCard({
  product,
  index,
  buttonText = "Дэлгэрэнгүй",
  buttonClassName = "bg-blue-600 hover:bg-blue-700",
  cardClassName = "bg-gray-50",
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow ${cardClassName}`}
    >
      <div className="h-64 relative bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority={index < 3}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <ul className="space-y-2 mb-6">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={`w-full py-2 text-white rounded-lg transition ${buttonClassName}`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}
