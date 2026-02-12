'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  School,
  CheckCircle,
  ShieldCheck,
  Clock,
  Users,
  Award,
  ArrowRight,
  GraduationCap,
  Zap,
  Shield,
  Settings,
  FileCheck,
  BookOpen,
  Star,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DroneServiceTrainingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-12 sm:py-16 lg:py-20 transition-colors overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
              Professional Services
            </span>
          </motion.div>

          <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 lg:mb-6 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              <span className="relative z-10 text-[1.25rem] sm:text-3xl lg:text-5xl">Дроны</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 blur-xl opacity-70" />
            </span>
            <span className="relative inline-block mt-1 sm:mt-0 ml-1 sm:ml-2 block sm:inline">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent text-[1.1rem] sm:text-3xl lg:text-5xl leading-tight">
                Засвар Үйлчилгээ & Сургалт
              </span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-xs sm:text-base lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300 px-2 sm:px-0"
          >
            Мэргэжлийн түвшинд DJI дроны албан ёсны засвар, техник дэмжлэг болон бүрэн хүрээний
            сургалтын үйлчилгээг санал болгодог
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12"
        >
          {/* Засвар Үйлчилгээ Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent dark:from-blue-500/5 dark:via-blue-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <Wrench className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      Засвар Үйлчилгээ
                    </h3>
                  </div>
                  <div className="px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
                    <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      24-48 цаг
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                  Бид DJI брэндийн бүх төрлийн дроны засвар, оношилгоо, тохируулгыг мэргэжлийн өндөр
                  түвшинд, албан ёсны сэлбэг хэрэгслээр хийж гүйцэтгэдэг.
                </p>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8">
                  {[
                    { icon: Settings, text: 'Албан ёсны сэлбэг хэрэгсэл', color: 'blue' },
                    { icon: Users, text: 'Мэргэжлийн инженерүүд', color: 'blue' },
                    { icon: Zap, text: 'Хурдан шуурхай засвар', color: 'blue' },
                    { icon: Shield, text: 'Баталгаат чанар', color: 'blue' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        <item.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Сургалт Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-600/5 to-transparent dark:from-green-500/5 dark:via-green-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600" />

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                      <School className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      Сургалт
                    </h3>
                  </div>
                  <div className="px-2.5 sm:px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50">
                    <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      Гэрчилгээтэй
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                  Мэргэшсэн багш нартай дроны жолоодлого, FAA дүрэм, агаарын хөдөлгөөний тухай бүрэн
                  хүрээнд суралцаж, олон улсын гэрчилгээ авах боломжтой.
                </p>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8">
                  {[
                    { icon: GraduationCap, text: 'Гэрчилгээ олгох сургалт', color: 'green' },
                    { icon: BookOpen, text: 'Практик дадлын хичээл', color: 'green' },
                    { icon: Users, text: 'Хувийн болон бүлгийн сургалт', color: 'green' },
                    { icon: FileCheck, text: 'Олон улсын стандарт', color: 'green' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="p-1.5 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                        <item.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/trainings">
                  <Button
                    className="
                      w-full sm:w-auto
                      bg-gradient-to-r from-green-600 to-green-700
                      hover:from-green-700 hover:to-green-800
                      dark:from-green-500 dark:to-green-600
                      dark:hover:from-green-600 dark:hover:to-green-700
                      text-white text-xs sm:text-base font-semibold
                      px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-xl
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-95
                      shadow-lg hover:shadow-xl shadow-green-500/25
                      group/btn
                    "
                  >
                    <span>Дэлгэрэнгүй мэдээлэл</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                value: '1000+',
                label: 'Амжилттай засвар',
                description: 'Сүүлийн 12 сард',
                icon: CheckCircle,
                color: 'blue',
              },
              {
                value: '6+',
                label: 'Сургалтын хөтөлбөр',
                description: 'Бүрэн хүрээний курс',
                icon: Calendar,
                color: 'green',
              },
              {
                value: '99.8%',
                label: 'Сэтгэл ханамж',
                description: 'Үйлчлүүлэгчдийн үнэлгээ',
                icon: Star,
                color: 'yellow',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${getColorClass(stat.color)} mb-3 sm:mb-4`}
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getColorClass(color: string) {
  switch (color) {
    case 'blue':
      return 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700';
    case 'green':
      return 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700';
    case 'yellow':
      return 'from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700';
    default:
      return 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700';
  }
}
