'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutCompanySection() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-1/2"
          >
            {/* Зургийн wrapper: мобайлд ч тогтвортой өндөртэй */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-[16/9] sm:aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src="/image/logo.png"
                alt="Инженер Геодези ХХК"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5 sm:mb-6">
              <span className="text-blue-600">Инженер Геодези</span> ХХК-ны тухай
            </h2>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-3.5 sm:mb-4">
              Манай компани нь 2018 оноос хойш Монгол улсад DJI Enterprise бүтээгдэхүүний албан ёсны
              дистрибьютерээр ажиллаж байна.
            </p>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              Бид газар зүй, барилга, уул уурхай, эрчим хүчний салбарт дроны технологийн шийдлүүдийг
              нэвтрүүлэх, мэргэжлийн сургалт явуулах, техник тоног төхөөрөмжийн борлуулалт, засвар
              үйлчилгээний чиглэлээр үйл ажиллагаа явуулдаг.
            </p>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
              <div className="bg-blue-50 p-3.5 sm:p-4 rounded-lg">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-0.5">
                  5+
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Жил туршлага</p>
              </div>
              <div className="bg-blue-50 p-3.5 sm:p-4 rounded-lg">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-0.5">
                  50+
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Гүйцэтгэсэн төсөл</p>
              </div>
              <div className="bg-blue-50 p-3.5 sm:p-4 rounded-lg">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-0.5">
                  20+
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                  Хамтрагч байгууллага
                </p>
              </div>
              <div className="bg-blue-50 p-3.5 sm:p-4 rounded-lg">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-0.5">
                  100%
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Сэтгэл ханамж</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
