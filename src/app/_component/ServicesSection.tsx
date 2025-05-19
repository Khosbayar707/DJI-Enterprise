import {
  FaMapMarkedAlt,
  FaBuilding,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaMapMarkedAlt className="text-4xl text-blue-600" />,
    title: "Газар зүйн зураглал",
    description:
      "Дроны орчин үеийн технологиор өндөр нарийвчлалтай зураглал, GIS системд зориулсан мэдээллийн сан бүрдүүлэлт",
  },
  {
    icon: <FaBuilding className="text-4xl text-blue-600" />,
    title: "Барилга, дэд бүтэц",
    description:
      "Барилга байгууламжийн явц хяналт, хэмжилт, 3D загварчлал, BIM системд зориулсан өгөгдөл боловсруулалт",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600" />,
    title: "Харилцан аюулгүй байдал",
    description:
      "Гамшгийн үед агаараас хяналт тавих, аврах ажиллагаанд дэмжлэг үзүүлэх, ослын газрын гэрэл зургийн бүртгэл",
  },
  {
    icon: <FaChartLine className="text-4xl text-blue-600" />,
    title: "Уул уурхайн мониторинг",
    description:
      "Уурхайн ил уурхайн хэмжээс, нөөцийн тооцоо, тээвэрлэлтийн мониторинг, stockpile хэмжилт",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-600">Инженер Геодези</span> ХХК-ны
            үйлчилгээ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Бид DJI Enterprise бүтээгдэхүүнийг ашиглан олон төрлийн мэргэжлийн
            шийдлүүдийг санал болгодог
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
