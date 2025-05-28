"use client";

import { usePathname } from "next/navigation";
import FooterMain from "./FooterMain";

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;
  return <FooterMain />;
}
