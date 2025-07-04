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
  },
  {
    icon: <FaSitemap className="text-4xl text-blue-600" />,
    title: 'ГАЗРЫН ХАРИЛЦАА, ГАЗРЫН ҮНЭЛГЭЭНИЙ ГРУПП',
    short: 'Газрын зориулалт, ашиглалт, төлөвлөлтийн зураглал боловсруулдаг.',
    details:
      'Газрын кадастр, хилийн тодорхойлолт, өмчлөлийн зохион байгуулалт, төлөвлөлтийн баримт бичиг боловсруулна.',
  },
  {
    icon: <FaHardHat className="text-4xl text-blue-600" />,
    title: 'БАРИЛГА, ХОТ БАЙГУУЛАЛТ, АРХИТЕКТУРЫН ГРУПП',
    short: 'Хот байгуулалт ба барилгын концепц зураглал, төлөвлөлт хариуцна.',
    details: 'Бүсчилсэн хөгжлийн төлөвлөгөө, 3D орон зайн анализ, барилгын концепц дизайн гаргана.',
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-blue-600" />,
    title: 'ГЕОДЕЗИ ГЕОМАТИКИЙН ГРУПП',
    short: 'Байр зүйн хэмжилт, 2D/3D зураглал, GIS мэдээллийн сан бүрдүүлдэг.',
    details:
      'Орчин үеийн GNSS, дроны хэмжилт ашиглан газрын зураглал, өндөрлөг зураглал, 3D модел боловсруулдаг.',
  },
  {
    icon: <FaMountain className="text-4xl text-blue-600" />,
    title: 'ГЕОТЕХНИК, ГИДРОГЕОЛОГИ, ГЕОФИЗИКИЙН ГРУПП',
    short: 'Газрын хэвлийн бүтэц, ашигт малтмалын судалгаа хариуцдаг.',
    details:
      'Өрөмдлөг, хээрийн судалгаа, сорьцлолт, геофизикийн хэмжилт хийж, геологийн зураглал боловсруулна.',
  },
  {
    icon: <FaBuilding className="text-4xl text-blue-600" />,
    title: 'ДРОНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ',
    short: 'DJI Enterprise дронуудын худалдаа, баталгаат засвар хариуцдаг.',
    details:
      'Дрон зөв сонгох зөвлөмж, ашиглалтын сургалт, баталгаат үйлчилгээ, сэлбэгийн нийлүүлэлт зэрэг иж бүрэн үйлчилгээ үзүүлдэг.',
  },
];

export default function ServicesAndDepartmentsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]); // array of refs

  useEffect(() => {
    if (openIndex !== null && refs.current[openIndex]) {
      refs.current[openIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openIndex]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Үйлчилгээ ба Хэлтсүүд</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            “Инженер Геодези” ХХК-ийн үндсэн хэлтэс, үйлчилгээний чиглэлүүдийг танилцуулж байна.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  refs.current[index] = el;
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                openIndex === index ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{item.icon}</div>

                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-semibold text-blue-600">{item.title}</h3>
                  <FaChevronDown
                    className={`transition-transform duration-300 text-blue-600 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <p className="text-gray-700 mt-2">{item.short}</p>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-sm text-gray-800 bg-blue-50 p-4 rounded-md border border-blue-100 w-full"
                    >
                      {item.details}
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
