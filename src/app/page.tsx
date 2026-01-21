import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'DJIGEO (Инженер Геодези ХХК) – Геодези ба зураг зүйн мэргэжлийн үйлчилгээ',
  description:
    'DJIGEO (Инженер Геодези ХХК) – Геодези, зураг зүй, дрон судалгаа, DJI Enterprise албан ёсны төлөөлөгч. Мэргэжлийн шийдэл, найдвартай үйлчилгээ.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.djigeo.mn',
  },
  openGraph: {
    title: 'DJIGEO – Геодези ба зураг зүйн мэргэжлийн үйлчилгээ',
    description:
      'DJIGEO (Инженер Геодези ХХК) – Геодези, зураг зүй, дрон судалгаа, DJI Enterprise албан ёсны төлөөлөгч.',
    url: 'https://www.djigeo.mn',
    siteName: 'DJIGEO',
    images: [
      {
        url: 'https://www.djigeo.mn/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DJIGEO – Геодези ба зураг зүй',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJIGEO – Геодези ба зураг зүй',
    description: 'DJIGEO (Инженер Геодези ХХК) – Геодези, зураг зүй, дрон судалгаа.',
    images: ['https://www.djigeo.mn/og-image.jpg'],
  },
};

export default function Page() {
  return <HomeClient />;
}
