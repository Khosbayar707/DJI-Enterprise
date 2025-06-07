'use client';

import { usePathname } from 'next/navigation';
import HeaderMain from './HeaderMain';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;
  return <HeaderMain />;
}
