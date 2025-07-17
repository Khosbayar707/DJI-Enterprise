'use client';

import { useState, useRef, useEffect } from 'react';
import {
  FaMapMarkedAlt,
  FaBuilding,
  FaFlask,
  FaSitemap,
  FaHardHat,
  FaMountain,
  FaChevronDown,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    icon: <FaFlask className="text-4xl text-blue-600" />,
    title: 'МЭРГЭЖЛИЙН ЛАБОРАТОРИ',
    short:
      'Хөрсний бүтэц, үржил шимийн судалгаа хийж, зөвлөмж боловсруулдаг. Мөн багаж баталгаажуулалтын хэмжилзүйн лаборатори CL-07.',
    details:
      'Хөрсний физик-химийн шинжилгээ, хээрийн сорьцлолт, эрдэсжилт тодорхойлж, газар ашиглалтад шинжлэх ухаанч үндэслэл гаргадаг. GPS, нивелир, теодолит зэрэг хэмжилтийн багажийг тохируулах, алдааг засварлах, мэргэжлийн түвшинд баталгаажуулах ажлыг гүйцэтгэнэ.',
    link: 'http://www.geo-mongol.mn/lab-tl-78',
  },
  {
    icon: <FaSitemap className="text-4xl text-blue-600" />,
    title: 'ГАЗРЫН ХАРИЛЦАА, ГАЗРЫН ҮНЭЛГЭЭНИЙ ГРУПП',
    short: 'Газрын зориулалт, ашиглалт, төлөвлөлтийн зураглал боловсруулдаг.',
    details:
      'Газрын кадастр, хилийн тодорхойлолт, өмчлөлийн зохион байгуулалт, төлөвлөлтийн баримт бичиг боловсруулна.',
    link: 'http://www.geo-mongol.mn/landRating',
  },
  {
    icon: <FaHardHat className="text-4xl text-blue-600" />,
    title: 'БАРИЛГА, ХОТ БАЙГУУЛАЛТ, АРХИТЕКТУРЫН ГРУПП',
    short: 'Хот байгуулалт ба барилгын концепц зураглал, төлөвлөлт хариуцна.',
    details: 'Бүсчилсэн хөгжлийн төлөвлөгөө, 3D орон зайн анализ, барилгын концепц дизайн гаргана.',
    link: 'http://www.geo-mongol.mn/architecture',
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-blue-600" />,
    title: 'ГЕОДЕЗИ ГЕОМАТИКИЙН ГРУПП',
    short: 'Байр зүйн хэмжилт, 2D/3D зураглал, GIS мэдээллийн сан бүрдүүлдэг.',
    details:
      'Орчин үеийн GNSS, дроны хэмжилт ашиглан газрын зураглал, өндөрлөг зураглал, 3D модел боловсруулдаг.',
    link: 'http://www.geo-mongol.mn/geodesyGroup',
  },
  {
    icon: <FaMountain className="text-4xl text-blue-600" />,
    title: 'ГЕОТЕХНИК, ГИДРОГЕОЛОГИ, ГЕОФИЗИКИЙН ГРУПП',
    short: 'Газрын хэвлийн бүтэц, ашигт малтмалын судалгаа хариуцдаг.',
    details:
      'Өрөмдлөг, хээрийн судалгаа, сорьцлолт, геофизикийн хэмжилт хийж, геологийн зураглал боловсруулна.',
    link: 'http://www.geo-mongol.mn/geologyGroup',
  },
  {
    icon: <FaBuilding className="text-4xl text-blue-600" />,
    title: 'ДРОНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ',
    short: 'DJI Enterprise дронуудын худалдаа, баталгаат засвар хариуцдаг.',
    details:
      'Дрон зөв сонгох зөвлөмж, ашиглалтын сургалт, баталгаат үйлчилгээ, сэлбэгийн нийлүүлэлт зэрэг иж бүрэн үйлчилгээ үзүүлдэг.',
    link: 'http://www.geo-mongol.mn/lesson',
  },
];

export default function ServicesAndDepartmentsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (openIndex !== null && refs.current[openIndex]) {
      refs.current[openIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [openIndex]);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-600">
            <span className="relative inline-block">
              <span className="relative z-10">Үйлчилгээ ба Хэлтсүүд</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 opacity-50 -z-0 transform translate-y-1"></span>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            "Инженер Геодези" ХХК-ийн үндсэн хэлтэс, үйлчилгээний чиглэлүүдийг танилцуулж байна.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (el) refs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 ${
                openIndex === index
                  ? 'ring-4 ring-blue-300 transform scale-[1.02]'
                  : 'hover:border-blue-200'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">{item.icon}</div>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-blue-600" />
                  </motion.div>
                </div>

                <p className="text-gray-600 mb-4 flex-grow">{item.short}</p>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-4 text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100 text-left">
                        {item.details}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Дэлгэрэнгүй
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
