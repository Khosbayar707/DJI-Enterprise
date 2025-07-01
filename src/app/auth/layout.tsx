import type { Metadata } from 'next';
import '../globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Хэрэглэгчийн хэсэг',
  description:
    'Бидэнтэй холбогдохын тулд утас, имэйл, хаягийн мэдээллийг ашиглана уу. Инженер Геодези ХХК - Мэргэжлийн дрон худалдаа.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: 'url("/auth/banner.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
      className="min-w-screen min-h-screen"
    >
      <Suspense>{children}</Suspense>
    </div>
  );
}
