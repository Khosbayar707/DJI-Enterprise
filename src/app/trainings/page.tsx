'use client';

import { useState, useMemo } from 'react';
import { Select, MenuItem, InputAdornment, TextField, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import InstructionRequestDialog from '../_component/instruction-request-dialog';

// Data remains the same...
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              Дроны Сургалт
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Мэргэжлийн түвшний ур чадварыг олгох төрөлжсөн сургалтууд
          </p>
        </div>

        <div className="sticky top-4 z-10 mb-10 sm:mb-12 flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="w-full md:w-auto flex items-center gap-3">
            <FilterAltIcon className="text-blue-500" />
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:min-w-[200px] dark:text-white"
              size="small"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                bgcolor: 'rgba(0,0,0,0.03)',
                borderRadius: '12px',
                '.dark &': { bgcolor: 'rgba(255,255,255,0.05)', color: 'white' },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            placeholder="Сургалт хайх..."
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
              className: 'rounded-xl dark:text-white bg-gray-50 dark:bg-gray-800/50',
            }}
            sx={{
              maxWidth: { md: '400px' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
              },
            }}
            size="small"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrainings.map((training, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-1 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                    {training.type}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                    {training.level} түвшин
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {training.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {training.description}
                </p>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <AccessTimeIcon fontSize="small" />
                    <span className="text-xs sm:text-sm font-medium">{training.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <PaymentsIcon fontSize="small" />
                    <span className="text-base sm:text-lg font-bold">{training.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 mb-6">
              <SearchIcon className="text-gray-300 dark:text-gray-600" sx={{ fontSize: 40 }} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              Илэрц олдсонгүй
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Та хайх үгээ эсвэл шүүлтүүрээ шалгана уу.
            </p>
          </div>
        )}

        <div className="mt-24 relative overflow-hidden rounded-2xl dark:bg-gray-900 bg-white p-8 md:p-16 text-center shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
          </div>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold dark:text-white mb-4 sm:mb-6">
            Сургалтанд бүртгүүлэхэд бэлэн үү?
          </h3>

          <p className="text-sm sm:text-base md:text-lg dark:text-blue-100/80 mb-8 sm:mb-10 max-w-xl mx-auto">
            Манай мэргэжлийн баг танд тохирсон сургалтыг сонгож, амжилтанд хүрэхэд туслах болно.
          </p>
          <div className="inline-block transform hover:scale-105 transition-transform">
            <InstructionRequestDialog />
          </div>
        </div>
      </div>
    </main>
  );
}
