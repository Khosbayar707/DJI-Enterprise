'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CalendarIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  HeartIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function AboutCompanySection() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: CalendarIcon,
      value: '5+',
      label: 'Жил туршлага',
      description: '2018 оноос хойш',
    },
    {
      icon: BriefcaseIcon,
      value: '50+',
      label: 'Гүйцэтгэсэн төсөл',
      description: 'Амжилттай хэрэгжүүлсэн',
    },
    {
      icon: BuildingOfficeIcon,
      value: '20+',
      label: 'Хамтрагч байгууллага',
      description: 'Найдвартай түншлэл',
    },
    {
      icon: HeartIcon,
      value: '100%',
      label: 'Сэтгэл ханамж',
      description: 'Үйлчлүүлэгчдийн үнэлгээ',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-12 sm:py-16 lg:py-20 transition-colors overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/5 dark:bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full lg:w-1/2"
          >
            <div
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden 
                bg-gradient-to-br from-white to-gray-50 
                shadow-xl hover:shadow-2xl shadow-emerald-500/5 dark:shadow-emerald-500/10
                border border-gray-200 dark:border-gray-800
                aspect-[4/3] transition-all duration-300 group"
            >
              <Image
                src="/image/logo.png"
                alt="Инженер Геодези ХХК"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-contain p-6 sm:p-8 lg:p-10 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 rounded-lg sm:rounded-xl backdrop-blur-sm border border-emerald-200 dark:border-emerald-800/50">
                <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full lg:w-1/2 space-y-5 sm:space-y-6 lg:space-y-8"
          >
            <div>
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                  rounded-full text-xs sm:text-sm font-medium
                  bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700
                  dark:from-emerald-900/30 dark:to-emerald-800/30 dark:text-emerald-300
                  border border-emerald-200 dark:border-emerald-800/50
                  shadow-sm"
              >
                <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Албан ёсны дистрибьютер
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 
                font-extrabold tracking-tight leading-tight"
            >
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">
                Инженер Геодези
              </span>
              <span className="text-gray-900 dark:text-white ml-1.5 sm:ml-2">ХХК</span>
            </motion.h2>

            <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              <p>
                Манай компани нь{' '}
                <span className="relative font-semibold text-emerald-600 dark:text-emerald-400">
                  2018 оноос
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-200 dark:bg-emerald-800 rounded-full" />
                </span>{' '}
                хойш Монгол улсад{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-md">
                  DJI Enterprise
                </span>{' '}
                бүтээгдэхүүний албан ёсны дистрибьютерээр ажиллаж байна.
              </p>
              <p>
                Бид газар зүй, барилга, уул уурхай, эрчим хүчний салбарт дроны технологийн шийдлийг
                нэвтрүүлэх, мэргэжлийн сургалт, техник тоног төхөөрөмжийн борлуулалт болон засвар
                үйлчилгээ үзүүлдэг.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 pt-3 sm:pt-4 lg:pt-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-500/10 dark:from-emerald-400/20 dark:to-emerald-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div
                    className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                    p-3 sm:p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl
                    border border-gray-200 dark:border-gray-800
                    shadow-md hover:shadow-xl
                    transition-all duration-300 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50"
                  >
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <div
                        className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg lg:rounded-xl 
                        bg-gradient-to-br from-emerald-50 to-emerald-100 
                        dark:from-emerald-900/40 dark:to-emerald-800/40
                        group-hover:scale-110 transition-transform duration-300"
                      >
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">
                          {stat.value}
                        </h3>
                        <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base">
                          {stat.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                          {stat.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 dark:from-emerald-400/5 dark:to-emerald-500/5 rounded-bl-xl rounded-tr-xl" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="pt-3 sm:pt-4 lg:pt-6">
              <a
                href="http://www.geo-mongol.mn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5
                  bg-gradient-to-r from-emerald-600 to-emerald-700
                  hover:from-emerald-700 hover:to-emerald-800
                  dark:from-emerald-500 dark:to-emerald-600
                  dark:hover:from-emerald-600 dark:hover:to-emerald-700
                  text-white text-xs sm:text-sm lg:text-base font-semibold
                  rounded-xl lg:rounded-2xl
                  shadow-lg hover:shadow-xl shadow-emerald-600/20 dark:shadow-emerald-500/20
                  transition-all duration-300
                  hover:scale-[1.02] active:scale-95
                  overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <GlobeAltIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative" />
                <span className="relative">Дэлгэрэнгүй</span>
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 italic flex items-center gap-1.5 pt-2"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Байгальд ээлтэй, дэвшилтэт технологийн шийдлүүд
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        />
      </div>
    </section>
  );
}
