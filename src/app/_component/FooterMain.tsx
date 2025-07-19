'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPhoneAlt, FaFacebookF, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const footerLinks = [
  {
    title: 'Бүтээгдэхүүн',
    links: [
      { name: 'Matrice Series', info: 'DJI-ийн аж үйлдвэрийн зориулалттай дрон' },
      { name: 'Mavic Series', info: 'Хувийн хэрэглээнд зориулсан хөнгөн дрон' },
      { name: 'Phantom Series', info: 'Мэргэжлийн гэрэл зургийн дрон' },
      { name: 'Дагалдах хэрэгсэл', info: 'Батерей, хайрцаг, сэнс гэх мэт' },
      { name: 'Программ хангамж', info: 'Удирдлага, өгөгдөл боловсруулалт' },
    ],
  },
  {
    title: 'Шийдлүүд',
    links: [
      { name: 'Аюулгүй байдал', info: 'Хяналт, онцгой байдлын шийдлүүд' },
      { name: 'Эрчим хүч', info: 'Шугам, сэргээгдэх эрчим хүчний хяналт' },
      { name: 'Хөдөө аж ахуй', info: 'Талбайн мониторинг, ургацын тооцоо' },
      { name: 'Барилга', info: 'Барилгын явцын хяналт' },
      { name: 'Дэд бүтэц', info: 'Зам, гүүрийн хяналт' },
    ],
  },
  {
    title: 'Дэмжлэг',
    links: [
      { name: 'Бүтээгдэхүүний дэмжлэг', info: 'Техникийн тусламж' },
      { name: 'Засвар үйлчилгээ', info: 'Мэргэжлийн инженерийн засвар' },
      { name: 'Программ шинэчлэлт', info: 'Firmware, програм хангамж' },
      {
        name: 'Холбоо барих',
        info: 'dji@geo-mongol.mn, +976 9000 5559 / +976 9190 2989 / +976 9909 5839',
      },
    ],
  },
  {
    title: 'Инженер Геодези',
    links: [{ name: 'Бидний тухай', info: 'DJI-ийн албан ёсны дистрибьютер (2018-оноос)' }],
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
    href: 'tel:+97690005559',
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

        {/* Contact Details */}
        <div className="mt-6 text-center md:text-left text-sm text-gray-600 space-y-2">
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaEnvelope className="text-blue-500" />
            <span>И-мэйл: </span>
            <a href="mailto:dji@geo-mongol.mn" className="text-blue-600 hover:underline">
              dji@geo-mongol.mn
            </a>
            ,{' '}
            <a href="mailto:dji_service@geo-mongol.mn" className="text-blue-600 hover:underline">
              dji_service@geo-mongol.mn
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt className="text-blue-500" />
            <span>Утас: </span>
            <a href="tel:+97690005559" className="text-blue-600 hover:underline">
              +976 9000 5559
            </a>{' '}
            |{' '}
            <a href="tel:+97691902989" className="text-blue-600 hover:underline">
              +976 9190 2989
            </a>{' '}
            |{' '}
            <a href="tel:+97699095839" className="text-blue-600 hover:underline">
              +976 9909 5839
            </a>
          </p>
          <p className="text-gray-500">
            Ажиллах цаг: Даваа-Баасан 09:00 - 18:00 / Бямба-Ням: Амарна
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
