import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "DJI Mavic 3 Enterprise",
    description: "Мэргэжлийн зураг авалт, thermal камер, RTK модуль",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["4/3 CMOS сенсор", "56x zoom", "43 мин нислэгийн хугацаа"],
  },
  {
    name: "DJI Matrice 300 RTK",
    description: "Аж үйлдвэрийн зориулалттай тэргүүлэх дрон",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["55 мин нислэг", "IP45 хамгаалалт", "6 сенсортой AI"],
  },
  {
    name: "DJI Zenmuse L1",
    description: "LiDAR сенсор бүхий гадаргуугын загварчлал",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["3D point cloud", "2400м хүртэл хэмжилт", "RGB + LiDAR"],
  },
];

export default function DJIProductsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-600">DJI Enterprise</span> Бүтээгдэхүүн
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Дэлхийд тэргүүлэгч DJI Enterprise бүтээгдэхүүнүүд
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-64 relative bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
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
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Дэлгэрэнгүй
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
