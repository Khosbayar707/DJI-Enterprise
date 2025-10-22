import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/lib/theme';
import Footer from './_component/Footer';
import Header from './_component/Header';
import { Suspense } from 'react';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://djigeo.mn';
const siteName = 'Djigeo';
const siteTitle = 'Djigeo — DJI Enterprise Mongolia | Дрон, Геодезийн Технологи';
const siteDescription =
  'Инженер Геодези ХХК нь DJI Enterprise-ийн Монгол дахь албан ёсны дистрибьютер. Дрон, геодезийн тоног төхөөрөмж, сургалт, засвар үйлчилгээ, мэргэжлийн зөвлөгөө.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Djigeo',
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/og/djigeo-og.jpg' }],
    locale: 'mn_MN',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og/djigeo-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <Suspense>
        <body className={`${montserrat.variable} font-sans`} suppressHydrationWarning>
          <Header />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <Footer />
        </body>
      </Suspense>
    </html>
  );
}
