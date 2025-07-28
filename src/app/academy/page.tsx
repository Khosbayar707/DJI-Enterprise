import React from 'react';

const trainings = [
  {
    title: 'Уул уурхайн салбарын дроны сургалт',
    description:
      'Уул уурхайд дроныг ашиглан газар шорооны хэмжээ тооцох, уурхайн төлөвлөлт, хяналт шалгалтыг гүйцэтгэх талаар мэргэжлийн сургалт.',
  },
  {
    title: 'Геологи, маркшейдерийн дроны сургалт',
    description:
      'Геологийн судалгаа, маркшейдерийн хэмжилт, 3D загварчлал хийхэд зориулагдсан онол, практикийг хослуулсан сургалт.',
  },
  {
    title: 'Геодези, байрзүйн зураглалын дроны сургалт',
    description:
      'Газар зүйн байрлал тодорхойлох, өндөр нарийвчлалтай байр зүйн зураг гаргах чадвар олгох сургалт.',
  },
  {
    title: 'Ойн салбарын дроны сургалт',
    description:
      'Ойн хяналт, модны бүрхэвчийн тооцоо, түймрийн хяналт, нөхөн сэргээлтэд дроныг ашиглах арга барилууд.',
  },
  {
    title: 'Мэргэжлийн дроны сургалт',
    description:
      'Мэргэжлийн түвшний нисгэгч бэлтгэх, нислэгийн төлөвлөлт, автомат нислэг, өгөгдлийн боловсруулалтын цогц сургалт.',
  },
  {
    title: 'Анхан шатны дроны сургалт',
    description:
      'Дрон жолоодох анхан шатны мэдлэг, аюулгүй байдал, хууль эрх зүйн орчны талаарх танилцуулга бүхий практик сургалт.',
  },
];

export default function DronesTrainingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Дроны Сургалтын Чиглэлүүд
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Мэргэжлийн түвшинд дроны технологийг эзэмшиж, шинэ боломжуудыг нээгээдэй
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((training, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6 md:p-7">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">
                    {index + 1}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {training.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {training.description}
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
                  Дэлгэрэнгүй мэдээлэл
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Бүртгүүлэх
        </button>
      </div>
    </main>
  );
}
