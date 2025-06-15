import type { Metadata } from 'next';
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
        <body className={`${montserrat.variable} font-sans`}>
          <Header />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <Footer />
        </body>
      </Suspense>
    </html>
  );
}
