import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_Mono, Noto_Serif } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/lib/theme';
import Footer from './_component/Footer';
import Header from './_component/Header';
import { Suspense } from 'react';

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-noto-sans',
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-noto-sans-mono',
});

const notoSerif = Noto_Serif({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: 'Инженер Геодези ХХК | DJI Enterprise албан ёсны дистрибьютер',
  description: 'Дэвшилтэт дрон технологи, газар зүйн зураглал, барилгын мониторингийн шийдлүүд',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <Suspense>
        <body
          className={`${notoSans.variable} ${notoSansMono.variable} ${notoSerif.variable} font-sans`}
        >
          <Header />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <Footer />
        </body>
      </Suspense>
    </html>
  );
}
