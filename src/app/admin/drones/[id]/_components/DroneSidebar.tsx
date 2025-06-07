'use client';

import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import { ImageIcon, SendToBack, VideoIcon } from 'lucide-react';
import { TfiAlignCenter } from 'react-icons/tfi';
import { DroneSideBarOptions } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@mui/material';

type Props = {
  activeSection: DroneSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<DroneSideBarOptions>>;
};

const DroneSidebar = ({ activeSection, setActiveSection }: Props) => {
  const params = useParams();
  const droneId = params?.id as string;

  const NavButton = ({
    label,
    icon,
    section,
  }: {
    label: string;
    icon: React.ReactNode;
    section: DroneSideBarOptions;
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
        <h2 className="text-2xl font-semibold mb-6">🛸 Дрон</h2>

        <Link
          href="/admin"
          className="text-sm text-blue-600 hover:underline flex items-center gap-2 mb-2"
        >
          <SendToBack size={18} /> Буцах
        </Link>

        <NavButton
          label="Ерөнхий мэдээлэл"
          icon={<TfiAlignCenter size={20} />}
          section={DroneSideBarOptions.GENERAL}
        />
        <NavButton
          label="Зураг"
          icon={<ImageIcon size={20} />}
          section={DroneSideBarOptions.IMAGES}
        />
        <NavButton
          label="Бичлэг"
          icon={<VideoIcon size={20} />}
          section={DroneSideBarOptions.VIDEOS}
        />
      </div>

      {droneId && (
        <div className="flex flex-col gap-2 text-sm">
          <Link href={`/dji/${droneId}`} target="_blank" className="text-blue-600 hover:underline">
            🔗 Дроны page дээр очих
          </Link>
          <Link
            href={`/preview/${droneId}`}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            👁️ Preview харах
          </Link>
        </div>
      )}
    </aside>
  );
};

export default DroneSidebar;
