'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutCompanySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/image/logo.png"
                alt="Инженер Геодези ХХК"
                fill
                className="object-contain w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-blue-600">Инженер Геодези</span> ХХК-ны тухай
            </h2>
            <p className="text-gray-600 mb-4">
              Манай компани нь 2018 оноос хойш Монгол улсад DJI Enterprise бүтээгдэхүүний албан ёсны
              дистрибьютерээр ажиллаж байна.
            </p>
            <p className="text-gray-600 mb-4">
              Бид газар зүй, барилга, уул уурхай, эрчим хүчний салбарт дроны технологийн шийдлүүдийг
              нэвтрүүлэх, мэргэжлийн сургалт явуулах, техник тоног төхөөрөмжийн борлуулалт, засвар
              үйлчилгээний чиглэлээр үйл ажиллагаа явуулдаг.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">5+</h3>
                <p className="text-gray-600">Жил туршлага</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">50+</h3>
                <p className="text-gray-600">Гүйцэтгэсэн төсөл</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">20+</h3>
                <p className="text-gray-600">Хамтрагч байгууллага</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">100%</h3>
                <p className="text-gray-600">Сэтгэл ханамж</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
