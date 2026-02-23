'use client';

import { usePathname } from 'next/navigation';
import { MainFooter } from './FooterMain';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;
  return <MainFooter />;
}
