'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPhoneAlt, FaFacebookF, FaYoutube } from 'react-icons/fa';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'; // Radix-ui wrapper

const footerLinks = [
  {
    title: 'Бүтээгдэхүүн',
    links: [
      {
        name: 'Matrice Series',
        info: 'DJI-ийн аж үйлдвэрийн зориулалттай дрон, өндөр чанар, удаан нислэгийн хугацаа',
      },
      {
        name: 'Mavic Series',
        info: 'Хувийн хэрэглээнд зориулсан боловсруулсан дрон, нимгэн, хөнгөн загвар',
      },
      {
        name: 'Phantom Series',
        info: 'Мэргэжлийн гэрэл зургийн дрон, өндөр нарийвчлалтай камер',
      },
      {
        name: 'Дагалдах хэрэгсэл',
        info: 'Дронд зориулсан нэмэлт хэрэгсэл, батерей, сэнс, хайрцаг гэх мэт',
      },
      {
        name: 'Программ хангамж',
        info: 'Дроны удирдлага, өгөгдөл боловсруулалтын программууд',
      },
    ],
  },
  {
    title: 'Шийдлүүд',
    links: [
      {
        name: 'Аюулгүй байдал',
        info: 'Онцгой байдлын үед хяналт тавих дроны шийдлүүд',
      },
      {
        name: 'Эрчим хүч',
        info: 'Цахилгаан дамжуулах шугам, сэргээгдэх эрчим хүчний байгууламжийн хяналт',
      },
      {
        name: 'Хөдөө аж ахуй',
        info: 'Тариалангийн талбайн мониторинг, ургацын тооцоо',
      },
      {
        name: 'Барилга',
        info: 'Барилгын талбайн дээд хяналт, явцын мониторинг',
      },
      {
        name: 'Дэд бүтэц',
        info: 'Зам гүүр, дэд бүтцийн барилгын хяналт',
      },
    ],
  },
  {
    title: 'Дэмжлэг',
    links: [
      {
        name: 'Бүтээгдэхүүний дэмжлэг',
        info: 'Бүх төрлийн техникийн асуулт, лавлагааны үйлчилгээ',
      },
      {
        name: 'Засвар үйлчилгээ',
        info: 'Албан ёсны засварын төв, мэргэжлийн инженерүүд',
      },
      {
        name: 'Программ шинэчлэлт',
        info: 'Сүүлийн үеийн firmware болон программ хангамжийн шинэчлэлт',
      },
      {
        name: 'Холбоо барих',
        info: 'Бидэнтэй холбогдох: dji@geo-mongol.mn, +976 9000 5559',
      },
    ],
  },
  {
    title: 'Инженер Геодези',
    links: [
      {
        name: 'Бидний тухай',
        info: '2018 оноос хойш DJI бүтээгдэхүүний албан ёсны дистрибьютер',
      },
    ],
  },
];

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: <FaYoutube className="w-5 h-5" />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <FaFacebookF className="w-5 h-5" />,
  },
  {
    name: 'Phone',
    href: 'tel:90005889',
    icon: <FaPhoneAlt className="w-5 h-5" />,
  },
];

const MainFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h4>
              <Accordion type="single" collapsible className="space-y-2">
                {section.links.map((link, i) => (
                  <AccordionItem key={i} value={`item-${idx}-${i}`}>
                    <AccordionTrigger className="text-left text-gray-700 hover:text-blue-600 text-sm">
                      {link.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm">
                      {link.info}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/image/logo.png"
                  alt="Инженер Геодези ХХК"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="ml-2 text-gray-800 font-medium">Инженер Геодези ХХК</span>
            </Link>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow hover:shadow-md text-gray-500 hover:text-blue-600 transition"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center md:text-left text-sm text-gray-500">
          Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот
          <br />
          И-мэйл: info@engineer-geodesy.mn | Утас: +976 7011 2233
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
