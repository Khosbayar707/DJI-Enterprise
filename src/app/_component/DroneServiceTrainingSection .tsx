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
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-24 lg:py-32 transition-colors overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-100 dark:border-blue-800/30"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
              Certified Services & Training
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              <span className="relative z-10">Дроны </span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 blur-xl opacity-70" />
            </span>
            <span className="relative inline-block ml-2">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                Засвар Үйлчилгээ & Сургалт
              </span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent dark:from-blue-500/5 dark:via-blue-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />

              <div className="p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <Wrench className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      Засвар Үйлчилгээ
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      <Clock className="w-4 h-4 inline mr-1" />
                      24-48 цаг
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  Бид DJI брэндийн бүх төрлийн дроны засвар, оношилгоо, тохируулгыг мэргэжлийн өндөр
                  түвшинд, албан ёсны сэлбэг хэрэгслээр хийж гүйцэтгэдэг.
                </p>

                <div className="space-y-4 mb-8">
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
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/services">
                  <Button
                    className="
                      w-full sm:w-auto
                      bg-gradient-to-r from-blue-600 to-blue-700
                      hover:from-blue-700 hover:to-blue-800
                      dark:from-blue-500 dark:to-blue-600
                      dark:hover:from-blue-600 dark:hover:to-blue-700
                      text-white text-base font-semibold
                      px-8 py-6 rounded-xl
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-95
                      shadow-lg hover:shadow-xl shadow-blue-500/25
                      group/btn
                    "
                  >
                    <span>Үйлчилгээний мэдээлэл</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-600/5 to-transparent dark:from-green-500/5 dark:via-green-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600" />

              <div className="p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                      <School className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      Сургалт
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      <Award className="w-4 h-4 inline mr-1" />
                      Гэрчилгээтэй
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  Мэргэшсэн багш нартай дроны жолоодлого, FAA дүрэм, агаарын хөдөлгөөний тухай бүрэн
                  хүрээнд суралцаж, олон улсын гэрчилгээ авах боломжтой.
                </p>

                <div className="space-y-4 mb-8">
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
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                        <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
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
                      text-white text-base font-semibold
                      px-8 py-6 rounded-xl
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-95
                      shadow-lg hover:shadow-xl shadow-green-500/25
                      group/btn
                    "
                  >
                    <span>Дэлгэрэнгүй мэдээлэл</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                value: '1000+',
                label: 'Амжилттай засвар',
                description: 'Сүүлийн 12 сард',
                icon: CheckCircle,
                color: 'blue',
              },
              {
                value: '50+',
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
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${getColorClass(stat.color)} mb-4`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
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
