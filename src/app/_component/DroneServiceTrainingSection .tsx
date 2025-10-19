'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wrench, School, CheckCircle } from 'lucide-react';

export default function DroneServiceTrainingSection() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center tracking-tight mb-8 sm:mb-12">
          Дроны Засвар Үйлчилгээ & Сургалт
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 sm:p-8">
            <div className="flex items-center mb-4 sm:mb-5">
              <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3 sm:mr-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Дроны Засвар Үйлчилгээ
              </h3>
            </div>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
              Бид DJI брэндийн бүх төрлийн дроны засвар, оношилгоо, тохируулгыг мэргэжлийн өндөр
              түвшинд хийж гүйцэтгэдэг.
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              {['Албан ёсны сэлбэг хэрэгсэл', 'Мэргэжлийн инженерүүд', 'Хурдан шуурхай засвар'].map(
                (item) => (
                  <li key={item} className="flex items-start">
                    <span className="mt-0.5 mr-2 sm:mr-3 inline-flex">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{item}</span>
                  </li>
                )
              )}
            </ul>

            <Link href="/services" className="inline-block">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 text-sm sm:text-base"
              >
                Үйлчилгээний мэдээлэл
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 sm:p-8">
            <div className="flex items-center mb-4 sm:mb-5">
              <School className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3 sm:mr-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Дроны Жолоодлогын Сургалт
              </h3>
            </div>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
              Мэргэшсэн багш нартай дроны жолоодлого, FAA дүрэм, агаарын хөдөлгөөний тухай бүрэн
              хүрээнд суралцана.
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              {[
                'Гэрчилгээ олгох сургалт',
                'Практик дадлын хичээл',
                'Хувийн болон бүлгийн сургалт',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mt-0.5 mr-2 sm:mr-3 inline-flex">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/trainings" className="inline-block">
              <Button
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50 text-sm sm:text-base"
              >
                Дэлгэрэнгүй мэдээлэл
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
