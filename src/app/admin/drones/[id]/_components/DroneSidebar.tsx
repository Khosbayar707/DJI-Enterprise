import { Dispatch, SetStateAction } from 'react';
import { ImageIcon, SendToBack, VideoIcon } from 'lucide-react';
import { DroneSideBarOptions } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@mui/material';
import { TfiAlignCenter } from 'react-icons/tfi';
const DroneSidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: DroneSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<DroneSideBarOptions>>;
}) => {
  return (
    <aside className="w-64 bg-muted p-6 flex flex-col gap-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Дрон</h2>
      <Link
        href={'/admin'}
        className="justify-start cursor-pointer shadow-2xl items-center flex gap-3"
      >
        <SendToBack size={20} /> <div>Буцах</div>
      </Link>
      <Button
        sx={{ justifyContent: 'flex-start' }}
        color={activeSection === DroneSideBarOptions.GENERAL ? 'primary' : 'inherit'}
        onClick={() => setActiveSection(DroneSideBarOptions.GENERAL)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <TfiAlignCenter size={20} /> <div>Ерөнхий мэдээлэл</div>
      </Button>
      <Button
        sx={{ justifyContent: 'flex-start' }}
        color={activeSection === DroneSideBarOptions.IMAGES ? 'primary' : 'inherit'}
        onClick={() => setActiveSection(DroneSideBarOptions.IMAGES)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <ImageIcon size={20} /> <div>Зураг</div>
      </Button>
      <Button
        sx={{ justifyContent: 'flex-start' }}
        color={activeSection === DroneSideBarOptions.VIDEOS ? 'primary' : 'inherit'}
        onClick={() => setActiveSection(DroneSideBarOptions.VIDEOS)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <VideoIcon size={20} /> <div>Бичлэг</div>
      </Button>
    </aside>
  );
};

export default DroneSidebar;
