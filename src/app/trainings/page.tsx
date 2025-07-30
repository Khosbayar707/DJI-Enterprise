'use client';

import { useState, useMemo } from 'react';
import { Select, MenuItem, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const trainings = [
  {
    title: 'Анхан шатны дроны сургалт',
    description:
      'Контент бүтээгч болон сонирхогчдод зориулсан сургалт. Жолоодлого, аюулгүй ажиллагаа, хууль эрх зүйн мэдлэгийг эзэмшүүлнэ.',
    type: 'Сонирхогч',
    level: 'Анхан',
    link: '/trainings/beginner',
    duration: '3 хоног',
    price: '₮450,000',
  },
  {
    title: 'Мэргэжлийн дроны сургалт',
    description:
      'Автомат нислэг, өгөгдөл цуглуулах, боловсруулалт хийх мэргэжлийн түвшний цогц сургалт.',
    type: 'Нийтлэг мэргэжлийн',
    level: 'Ахисан',
    link: '/trainings/professional',
    duration: '5 хоног',
    price: '₮750,000',
  },
  {
    title: 'Агаарын зураглалын дроны сургалт',
    description:
      'Геодези, байрзүйн зураглал болон хайгуулын зориулалттай, өндөр нарийвчлалтай зураг гаргах ур чадвар олгоно.',
    type: 'Гео зураглал',
    level: 'Мэргэжлийн',
    link: '/trainings/mapping',
    duration: '4 хоног',
    price: '₮650,000',
  },
  {
    title: 'Хөдөө аж ахуйн дроны сургалт',
    description:
      'Тариалангийн талбайд бордоо цацалт, ургамал хамгааллын ажилд дроныг үр дүнтэй ашиглах арга барилууд.',
    type: 'ХАА',
    level: 'Мэргэжлийн',
    link: '/trainings/agriculture',
    duration: '3 хоног',
    price: '₮550,000',
  },
  {
    title: 'Ойн салбарын дроны сургалт',
    description:
      'Ойн шавжтай тэмцэх, түймрийн тандалт, нөхөн сэргээлтэд дроныг ашиглах мэргэжлийн ур чадвар олгоно.',
    type: 'Ой',
    level: 'Мэргэжлийн',
    link: '/trainings/forestry',
    duration: '4 хоног',
    price: '₮600,000',
  },
  {
    title: 'Уул уурхайн дроны сургалт',
    description:
      'Уурхайн хэмжилт, маркшейдерийн хэмжилт, карьераа хянахад дроныг ашиглах мэргэжлийн сургалт.',
    type: 'Уул уурхай',
    level: 'Мэргэжлийн',
    link: '/trainings/mining',
    duration: '5 хоног',
    price: '₮700,000',
  },
];

const categories = [
  'Бүгд',
  'Сонирхогч',
  'Нийтлэг мэргэжлийн',
  'Гео зураглал',
  'ХАА',
  'Ой',
  'Уул уурхай',
];

export default function DronesTrainingPage() {
  const [selectedType, setSelectedType] = useState('Бүгд');
  const [searchText, setSearchText] = useState('');

  const filteredTrainings = useMemo(() => {
    return trainings.filter((t) => {
      const matchesType = selectedType === 'Бүгд' || t.type === selectedType;
      const matchesSearch =
        t.title.toLowerCase().includes(searchText.toLowerCase()) ||
        t.description.toLowerCase().includes(searchText.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchText]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Дроны Сургалтын Чиглэлүүд
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Өөрийн хэрэгцээнд тохирсон мэргэжлийн сургалтаа сонгоно уу
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="w-full md:w-auto flex items-center gap-2">
          <FilterAltIcon className="text-gray-500" />
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="min-w-[180px] bg-gray-50 rounded-lg"
            size="small"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>

        <TextField
          placeholder="Хайх..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="w-full md:w-96 bg-gray-50 rounded-lg"
          size="small"
        />
      </div>

      {/* Training Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrainings.map((training, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {training.type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {training.level}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-3">{training.title}</h2>
              <p className="text-gray-600 mb-5 line-clamp-3">{training.description}</p>

              <div className="flex justify-between text-sm text-gray-500 mb-5">
                <div>
                  <div className="font-medium">Хугацаа:</div>
                  <div>{training.duration}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Үнэ:</div>
                  <div className="text-blue-600 font-semibold">{training.price}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href={training.link}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Дэлгэрэнгүй
                </a>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTrainings.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <SearchIcon className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Илэрц олдсонгүй</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Хайлтын үр дүнд тохирох сургалт олдсонгүй. Өөр шүүлтүүр ашиглана уу.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Сургалтанд бүртгүүлэхэд бэлэн үү?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Манай мэргэжлийн баг танд тохирсон сургалтыг сонгож, амжилтанд хүрэхэд туслах болно.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
          Бүртгүүлэх хүсэлт илгээх
        </button>
      </div>
    </main>
  );
}
