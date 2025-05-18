import Image from "next/image";
import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Улаанбаатар хотын GIS систем",
    description: "Дроны зураглалаар бүрдүүлсэн газар зүйн мэдээллийн систем",
    image: "/image/Geographic.jpg",
    tags: ["Газар зүй", "DJI Phantom 4 RTK", "2023"],
  },
  {
    title: "Цахилгаан дамжуулах шугамын хяналт",
    description: "Thermal камер ашиглан дэд станцын техникийн үзлэг",
    image: "/image/Geographic.jpg",
    tags: ["Эрчим хүч", "DJI Mavic 3T", "2024"],
  },
  {
    title: "Авто замын барилгын мониторинг",
    description: "Барилгын явцыг дроноор хянах системийн нэвтрүүлэлт",
    image: "/image/Geographic.jpg",
    tags: ["Барилга", "DJI Matrice 300", "2023"],
  },
];

export default function CaseStudiesSection() {
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
            <span className="text-blue-600">Төслүүд</span> ба Амжилтын түүхүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Бидний гүйцэтгэсэн төслүүдээс түлхүүрчилсэн түүхүүд
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 relative">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {study.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <button className="text-blue-600 font-medium flex items-center">
                  Дэлгэрэнгүй
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
