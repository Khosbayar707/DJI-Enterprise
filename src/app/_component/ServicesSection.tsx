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
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20 lg:py-24 transition-colors overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50"
          >
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Professional Departments
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent">
                Үйлчилгээ ба Хэлтсүүд
              </span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 blur-xl opacity-70" />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            "Инженер Геодези" ХХК-ийн үндсэн хэлтэс, үйлчилгээний чиглэлүүдийг танилцуулж байна.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent dark:from-blue-500/5 dark:via-blue-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />

                  <div className="p-6 sm:p-8">
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
                      className="w-full text-left outline-none group/button"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-start justify-between w-full mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                            <Icon className="text-2xl sm:text-3xl text-white" />
                          </div>
                          <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30"
                          >
                            <FaChevronDown className="text-blue-600 dark:text-blue-400 text-sm sm:text-base group-hover/button:scale-110 transition-transform" />
                          </motion.div>
                        </div>

                        <div className="w-full">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover/button:text-blue-700 dark:group-hover/button:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 line-clamp-2">
                            {item.short}
                          </p>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          id={`card-panel-${index}`}
                          key="content"
                          layout
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 sm:p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              {item.details}
                            </p>
                            {item.link && (
                              <motion.a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center mt-4 font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-lg text-sm sm:text-base group/link"
                              >
                                Дэлгэрэнгүй мэдээлэл
                                <svg
                                  className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
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
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 sm:gap-6">
            <div className="text-left">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                15+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Жил туршлага
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="text-left">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                1000+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Төсөл дүн</div>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="text-left">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                50+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Мэргэжилтэн
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
