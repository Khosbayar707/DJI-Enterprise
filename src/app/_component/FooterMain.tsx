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
    links: [
      {
        name: 'Бидний тухай',
        info: 'DJI-ийн албан ёсны дистрибьютер (2018-оноос)',
      },
    ],
  },
];

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DJIEnterpriseMongolia-q4b',
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/DJIMongols',
    icon: <FaFacebookF className="h-5 w-5" />,
  },
  { name: 'Phone', href: 'tel:+97690005559', icon: <FaPhoneAlt className="h-5 w-5" /> },
];

const MainFooter = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
              prefetch={false}
              aria-label="Нүүр хуудас руу очих"
            >
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/image/logo.png"
                  alt="Инженер Геодези ХХК"
                  fill
                  className="object-contain dark:brightness-90 dark:contrast-125"
                  sizes="40px"
                />
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Инженер Геодези ХХК
              </span>
            </Link>
          </div>

          <div className="flex justify-center sm:justify-start">
            <div className="flex items-center gap-2">
              {socialLinks.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 dark:bg-gray-800 dark:ring-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                  aria-label={s.name}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <Accordion
            type="multiple"
            className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-4"
            defaultValue={['mobile-0', 'mobile-1', 'mobile-2', 'mobile-3']}
          >
            {footerLinks.map((section, idx) => (
              <AccordionItem
                key={idx}
                value={`mobile-${idx}`}
                className="border border-gray-200 rounded-lg bg-white px-4 data-[state=open]:bg-gray-25 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:data-[state=open]:bg-gray-700/50"
              >
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-gray-800 hover:no-underline [&[data-state=open]]:text-blue-600 dark:text-gray-200 dark:[&[data-state=open]]:text-blue-400">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="space-y-3">
                    {section.links.map((link, i) => (
                      <li
                        key={i}
                        className="rounded-lg bg-gray-50 p-3 border border-gray-100 hover:bg-gray-100 transition-colors dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <p className="text-[15px] font-medium text-gray-800 mb-1 dark:text-gray-200">
                          {link.name}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {link.info}
                        </p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

        <Accordion type="single" collapsible defaultValue="contact-info">
          <AccordionItem value="contact-info" className="border-0">
            <AccordionTrigger className="p-3 text-left text-sm font-semibold text-gray-700 hover:no-underline [&[data-state=open]]:text-blue-600 border-b border-gray-200 dark:text-gray-300 dark:[&[data-state=open]]:text-blue-400 dark:border-gray-800">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
                Холбоо барих мэдээлэл
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="grid gap-6 text-sm text-gray-700 md:grid-cols-2 lg:grid-cols-3 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm leading-relaxed">
                    Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0 text-blue-500 dark:text-blue-400" />
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      И-мэйл:
                    </span>
                    <div className="flex flex-col space-y-1">
                      <a
                        href="mailto:dji@geo-mongol.mn"
                        className="text-blue-600 text-sm underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
                      >
                        dji@geo-mongol.mn
                      </a>
                      <a
                        href="mailto:dji_service@geo-mongol.mn"
                        className="text-blue-600 text-sm underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
                      >
                        dji_service@geo-mongol.mn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="shrink-0 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Утас:
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: '+976 9000 5559', href: 'tel:+97690005559' },
                      { label: '+976 9190 2989', href: 'tel:+97691902989' },
                      { label: '+976 9909 5839', href: 'tel:+97699095839' },
                    ].map((p, i) => (
                      <a
                        key={i}
                        href={p.href}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-blue-100 transition-all hover:bg-blue-50 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 dark:bg-gray-800 dark:text-blue-400 dark:ring-blue-900/50 dark:hover:bg-gray-700"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-sm text-gray-500 bg-gray-100 rounded-lg p-3 text-center dark:bg-gray-800 dark:text-gray-400">
                    Ажиллах цаг: Даваа-Баасан 09:00 - 18:00 / Бямба-Ням: Амарна
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-6 flex flex-col items-center gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 sm:text-left dark:text-gray-400">
            &copy; {new Date().getFullYear()} Инженер Геодези ХХК. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <Link
            href="#top"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            ↑ Дээш буцах
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
