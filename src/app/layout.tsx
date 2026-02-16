import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Footer from './_component/Footer';
import Header from './_component/Header';
import { Suspense } from 'react';
import { Providers } from './providers';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <Suspense fallback={null}>{children}</Suspense>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
