'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: 'Улаанбаатар хотын GIS систем',
    description: 'Дроны зураглалаар бүрдүүлсэн газар зүйн мэдээллийн систем',
    details: [
      '150 км² нутаг дэвсгэрийн дээд зургийн сан',
      '10 см-ийн нарийвчлалтай орто зураг',
      'Газрын хэвлий, дэд бүтцийн мэдээллийн сан',
    ],
    image: '/image/Geographic.jpg',
    tags: ['Газар зүй', 'DJI Phantom 4 RTK', '2023'],
  },
  {
    title: 'Цахилгаан дамжуулах шугамын хяналт',
    description: 'Thermal камер ашиглан дэд станцын техникийн үзлэг',
    details: [
      '50 км цахилгаан дамжуулах шугамын thermal дүн шинжилгээ',
      'Хэт халсан цэгүүдийг илрүүлэх',
      'Урьдчилан сэргийлэх засварын төлөвлөгөө',
    ],
    image: '/image/Geographic.jpg',
    tags: ['Эрчим хүч', 'DJI Mavic 3T', '2024'],
  },
  {
    title: 'Авто замын барилгын мониторинг',
    description: 'Барилгын явцыг дроноор хянах системийн нэвтрүүлэлт',
    details: [
      'Долоо хоног тутмын агаарын зураглал',
      '3D загварчлал ба эзлэхүүний тооцоо',
      'Гүйцэтгэлийн график тайлангууд',
    ],
    image: '/image/Geographic.jpg',
    tags: ['Барилга', 'DJI Matrice 300', '2023'],
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
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="text-blue-600">Төслүүд</span> ба Амжилтын түүхүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Бидний гүйцэтгэсэн төслүүдээс түлхүүрчилсэн түүхүүд
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-56 relative">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>

                <div className="mb-5 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">ГҮЙЦЭТГЭЛ:</h4>
                  <ul className="space-y-2">
                    {study.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-4 h-4 mt-1 mr-2 text-blue-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
