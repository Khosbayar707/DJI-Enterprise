'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { Boxes, Images, Package, Users, LogOut, Home } from 'lucide-react';
import { Button } from '@mui/material';
import { AdminSideBarOptions } from '@/lib/types';
import Link from 'next/link';
import axios from 'axios';

type Props = {
  activeSection: AdminSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<AdminSideBarOptions>>;
};

const Sidebar = ({ activeSection, setActiveSection }: Props) => {
  const logout = useCallback(async () => {
    try {
      await axios.get('/api/auth/logout');
      window.location.href = '/auth/login';
    } catch (err) {
      console.error(err);
    }
  }, []);

  const NavButton = ({
    label,
    icon,
    section,
  }: {
    label: string;
    icon: React.ReactNode;
    section: AdminSideBarOptions;
  }) => (
    <Button
      sx={{
        justifyContent: 'flex-start',
        padding: '10px 16px',
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 500,
        backgroundColor: activeSection === section ? 'rgba(59,130,246,0.1)' : 'transparent',
        color: activeSection === section ? '#2563EB' : 'rgba(0,0,0,0.7)',
        '&:hover': { backgroundColor: 'rgba(59,130,246,0.15)' },
      }}
      onClick={() => setActiveSection(section)}
      className="flex gap-3 items-center w-full"
    >
      {icon}
      {label}
    </Button>
  );

  return (
    <aside className="w-80 h-screen bg-white border-r px-6 py-8 flex flex-col justify-between shadow-sm">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold mb-6">⚙️ Админ самбар</h2>
        <NavButton
          label="Бүтээгдэхүүн"
          icon={<Boxes size={20} />}
          section={AdminSideBarOptions.products}
        />
        <NavButton
          label="Дрон худалдан авах хүсэлт"
          icon={<Users size={20} />}
          section={AdminSideBarOptions.DroneBuyRequest}
        />
        <NavButton
          label="Холбоо барих хүсэлт"
          icon={<Users size={20} />}
          section={AdminSideBarOptions.ContactRequest}
        />
        <NavButton
          label="Сургалт авах хүсэлт"
          icon={<Users size={20} />}
          section={AdminSideBarOptions.InstructionRequest}
        />
        <NavButton label="Медиа" icon={<Images size={20} />} section={AdminSideBarOptions.images} />
      </div>

      <div className="flex flex-col gap-2">
        <Link
          target="_blank"
          href="/"
          className="text-sm text-blue-600 hover:underline flex items-center gap-2"
        >
          <Home size={16} /> Нүүр хуудас руу
        </Link>
        <Button onClick={logout} color="error" variant="outlined" startIcon={<LogOut size={18} />}>
          Гарах
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
