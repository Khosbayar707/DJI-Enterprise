'use client';

import Image from 'next/image';
import { LoanProvider } from '../_types/types';

const loanProviders: LoanProvider[] = [
  {
    name: 'Storepay',
    description:
      'Storepay-ийн уян хатан төлбөрийн нөхцөлөөр урьдчилгаагүйгээр худалдан авалт хийгээрэй.',
    logo: '/image/storepaylogo.png',
    link: 'https://storepay.mn',
  },
  {
    name: 'Pocket',
    description:
      'Pocket зээлийн үйлчилгээгээр бага хүүтэй, хурдан шийдвэрээр бараа авах боломжтой.',
    logo: '/image/pocketlogo.png',
    link: 'https://pocket.mn',
  },
];

export default function LoanChances() {
  return (
    <div
      className="
      mt-12 
      bg-white dark:bg-slate-900
      p-6 sm:p-8 
      rounded-2xl 
      shadow-lg dark:shadow-2xl
      transition-colors duration-300
    "
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Төлбөрийн боломж
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {loanProviders.map((provider) => (
          <a
            key={provider.name}
            href={provider.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex items-center gap-4
              p-5
              rounded-2xl
              border border-gray-200 dark:border-gray-700
              bg-gray-50 dark:bg-slate-800
              hover:shadow-xl
              hover:-translate-y-1
              transition-all duration-300
            "
          >
            <div
              className="
              w-16 h-16 relative 
              rounded-xl 
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-slate-900
              overflow-hidden
              flex-shrink-0
            "
            >
              <Image
                src={provider.logo}
                alt={`${provider.name} logo`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {provider.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {provider.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
