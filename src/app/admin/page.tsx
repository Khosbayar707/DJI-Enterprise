'use client';
import { useState } from 'react';
import Sidebar from './_components/sidebar';
import { AdminSideBarOptions } from '@/lib/types';
import { sectionComponents } from './_components/_sections/sections';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSideBarOptions>(
    AdminSideBarOptions.products
  );

  return (
    <div className="flex h-screen">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 overflow-y-auto">{sectionComponents[activeSection]}</main>
    </div>
  );
};

export default AdminPage;
