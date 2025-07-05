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
    <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Төлбөрийн боломж</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {loanProviders.map((provider) => (
          <a
            key={provider.name}
            href={provider.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-2xl hover:shadow-lg transition"
          >
            <div className="w-16 h-16 relative mr-4 rounded-xl border border-gray-300 overflow-hidden">
              <Image
                src={provider.logo}
                alt={`${provider.name} logo`}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
