'use client';

import { Dispatch, SetStateAction } from 'react';
import { ImageIcon, SendToBack } from 'lucide-react';
import { SpecSideBarOptions } from '@/lib/types';
import { TfiAlignCenter } from 'react-icons/tfi';
import Link from 'next/link';
import { Button } from '@mui/material';

type Props = {
  activeSection: SpecSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<SpecSideBarOptions>>;
};

const SpecSidebar = ({ activeSection, setActiveSection }: Props) => {
  const NavButton = ({
    label,
    icon,
    section,
  }: {
    label: string;
    icon: React.ReactNode;
    section: SpecSideBarOptions;
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
        '&:hover': {
          backgroundColor: 'rgba(59,130,246,0.15)',
        },
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
        <h2 className="text-2xl font-semibold mb-6">⚙️ Эд анги</h2>

        <Link
          href="/admin"
          className="text-sm text-blue-600 hover:underline flex items-center gap-2 mb-2"
        >
          <SendToBack size={18} /> Буцах
        </Link>

        <NavButton
          label="Ерөнхий мэдээлэл"
          icon={<TfiAlignCenter size={20} />}
          section={SpecSideBarOptions.GENERAL}
        />
        <NavButton
          label="Зураг"
          icon={<ImageIcon size={20} />}
          section={SpecSideBarOptions.IMAGES}
        />
        <NavButton
          label="Бичлэг"
          icon={<ImageIcon size={20} />}
          section={SpecSideBarOptions.VIDEOS}
        />
      </div>
    </aside>
  );
};

export default SpecSidebar;
