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
import type { IconType } from 'react-icons';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const items: Array<{
  icon: IconType;
  title: string;
  short: string;
  details: string;
  link?: string;
}> = [
  {
    icon: FaFlask,
    title: 'МЭРГЭЖЛИЙН ЛАБОРАТОРИ',
    short:
      'Хөрсний бүтэц, үржил шимийн судалгаа хийж, зөвлөмж боловсруулдаг. Мөн багаж баталгаажуулалтын хэмжилзүйн лаборатори CL-07.',
    details:
      'Хөрсний физик-химийн шинжилгээ, хээрийн сорьцлолт, эрдэсжилт тодорхойлж, газар ашиглалтад шинжлэх ухаанч үндэслэл гаргадаг. GPS, нивелир, теодолит зэрэг хэмжилтийн багажийг тохируулах, алдааг засварлах, мэргэжлийн түвшинд баталгаажуулах ажлыг гүйцэтгэнэ.',
    link: 'http://www.geo-mongol.mn/lab-tl-78',
  },
  {
    icon: FaSitemap,
    title: 'ГАЗРЫН ХАРИЛЦАА, ГАЗРЫН ҮНЭЛГЭЭНИЙ ГРУПП',
    short: 'Газрын зориулалт, ашиглалт, төлөвлөлтийн зураглал боловсруулдаг.',
    details:
      'Газрын кадастр, хилийн тодорхойлолт, өмчлөлийн зохион байгуулалт, төлөвлөлтийн баримт бичиг боловсруулна.',
    link: 'http://www.geo-mongol.mn/landRating',
  },
  {
    icon: FaHardHat,
    title: 'БАРИЛГА, ХОТ БАЙГУУЛАЛТ, АРХИТЕКТУРЫН ГРУПП',
    short: 'Хот байгуулалт ба барилгын концепц зураглал, төлөвлөлт хариуцна.',
    details: 'Бүсчилсэн хөгжлийн төлөвлөгөө, 3D орон зайн анализ, барилгын концепц дизайн гаргана.',
    link: 'http://www.geo-mongol.mn/architecture',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'ГЕОДЕЗИ ГЕОМАТИКИЙН ГРУПП',
    short: 'Байр зүйн хэмжилт, 2D/3D зураглал, GIS мэдээллийн сан бүрдүүлдэг.',
    details:
      'Орчин үеийн GNSS, дроны хэмжилт ашиглан газрын зураглал, өндөрлөг зураглал, 3D модел боловсруулдаг.',
    link: 'http://www.geo-mongol.mn/geodesyGroup',
  },
  {
    icon: FaMountain,
    title: 'ГЕОТЕХНИК, ГИДРОГЕОЛОГИ, ГЕОФИЗИКИЙН ГРУПП',
    short: 'Газрын хэвлийн бүтэц, ашигт малтмалын судалгаа хариуцдаг.',
    details:
      'Өрөмдлөг, хээрийн судалгаа, сорьцлолт, геофизикийн хэмжилт хийж, геологийн зураглал боловсруулна.',
    link: 'http://www.geo-mongol.mn/geologyGroup',
  },
  {
    icon: FaBuilding,
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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (openIndex !== null && refs.current[openIndex]) {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        refs.current[openIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [openIndex]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-blue-600">
            <span className="relative inline-block">
              <span className="relative z-10">Үйлчилгээ ба Хэлтсүүд</span>
              <span className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-blue-200 opacity-50 -z-0 translate-y-1"></span>
            </span>
          </h2>
          <p className="text-gray-600 mx-auto text-sm sm:text-lg leading-relaxed max-w-[60ch] px-2">
            "Инженер Геодези" ХХК-ийн үндсэн хэлтэс, үйлчилгээний чиглэлүүдийг танилцуулж байна.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            const expanded = openIndex === index;
            return (
              <motion.div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  if (el) refs.current[index] = el;
                }}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                viewport={{ once: true, margin: '-50px' }}
                className={`group bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 focus-within:ring-4 focus-within:ring-blue-300 ${
                  expanded ? 'ring-4 ring-blue-300' : 'hover:border-blue-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(expanded ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenIndex(expanded ? null : index);
                    }
                  }}
                  aria-expanded={expanded}
                  aria-controls={`card-panel-${index}`}
                  className="w-full text-left outline-none"
                >
                  <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
                    <div className="mb-4 p-3 sm:p-3.5 bg-blue-50 rounded-full">
                      <Icon className="text-2xl sm:text-4xl text-blue-600" />
                    </div>

                    <div className="flex items-center justify-center sm:justify-between gap-2 mb-1 sm:mb-2 w-full">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800">{item.title}</h3>
                      <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <FaChevronDown className="text-blue-600 text-sm sm:text-base" />
                      </motion.div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                      {item.short}
                    </p>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`card-panel-${index}`}
                      key="content"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-2 sm:mt-4 text-gray-700 bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                        <p className="text-xs sm:text-base leading-relaxed">{item.details}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-3 sm:mt-4 font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-lg text-sm sm:text-base"
                          >
                            Дэлгэрэнгүй
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
