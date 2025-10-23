'use client';

import { Dispatch, SetStateAction, useCallback, useMemo, useState, KeyboardEvent } from 'react';
import { Boxes, Images, Users, LogOut, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, IconButton, Tooltip, Divider } from '@mui/material';
import { AdminSideBarOptions } from '@/lib/types';
import Link from 'next/link';
import axios from 'axios';

type Props = {
  activeSection: AdminSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<AdminSideBarOptions>>;
};

const Sidebar = ({ activeSection, setActiveSection }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const logout = useCallback(async () => {
    try {
      await axios.get('/api/auth/logout');
      window.location.href = '/auth/login';
    } catch (err) {
      console.error(err);
    }
  }, []);

  const items = useMemo(
    () => [
      { label: 'Бүтээгдэхүүн', icon: Boxes, section: AdminSideBarOptions.products },
      {
        label: 'Дрон худалдан авах хүсэлт',
        icon: Users,
        section: AdminSideBarOptions.DroneBuyRequest,
      },
      { label: 'Холбоо барих хүсэлт', icon: Users, section: AdminSideBarOptions.ContactRequest },
      {
        label: 'Сургалт авах хүсэлт',
        icon: Users,
        section: AdminSideBarOptions.InstructionRequest,
      },
      { label: 'Медиа', icon: Images, section: AdminSideBarOptions.images },
    ],
    []
  );

  const handleKeyActivate = (e: KeyboardEvent<HTMLButtonElement>, section: AdminSideBarOptions) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSection(section);
    }
  };

  const NavButton = ({
    label,
    Icon,
    section,
  }: {
    label: string;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    section: AdminSideBarOptions;
  }) => {
    const isActive = activeSection === section;

    return (
      <Tooltip title={collapsed ? label : ''} placement="right" arrow>
        <Button
          onClick={() => setActiveSection(section)}
          onKeyDown={(e) => handleKeyActivate(e, section)}
          aria-selected={isActive}
          tabIndex={0}
          fullWidth
          className="group !justify-start !normal-case !rounded-2xl !py-3 !px-3 focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-blue-400"
          sx={{
            gap: 1.5,
            color: isActive ? '#1d4ed8' : 'rgba(0,0,0,0.72)',
            backgroundColor: isActive ? 'rgba(59,130,246,0.10)' : 'transparent',
            '&:hover': {
              background:
                'linear-gradient(90deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.06) 100%)',
            },
            position: 'relative',
          }}
        >
          {/* Active indicator bar */}
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1.5 rounded-r-lg transition-all ${
              isActive ? 'bg-blue-600 opacity-100' : 'bg-blue-600 opacity-0 group-hover:opacity-60'
            }`}
          />
          <Icon size={20} className="shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </Button>
      </Tooltip>
    );
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-[84px]' : 'w-80'
      } h-screen bg-white border-r flex flex-col justify-between shadow-sm transition-[width] duration-200`}
    >
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-sm flex items-center justify-center text-white font-semibold">
              ⚙️
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <h2 className="text-lg font-semibold">Админ самбар</h2>
                <p className="text-xs text-gray-500">DJI Enterprise</p>
              </div>
            )}
          </div>
          <Tooltip title={collapsed ? 'Өргөжүүлэх' : 'Хураах'} arrow>
            <IconButton
              size="small"
              onClick={() => setCollapsed((v) => !v)}
              className="!text-gray-600 hover:!bg-gray-100"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </IconButton>
          </Tooltip>
        </div>

        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="px-3 overflow-y-auto">
        <nav className="flex flex-col gap-1.5 pb-4">
          {items.map(({ label, icon: Icon, section }) => (
            <NavButton key={section} label={label} Icon={Icon} section={section} />
          ))}
        </nav>
      </div>

      <div className="px-4 pb-5">
        <Divider className="!mb-3" />
        <div className="flex flex-col gap-2">
          <Link
            target="_blank"
            href="/"
            className={`${
              collapsed ? 'justify-center' : ''
            } text-sm text-blue-600 hover:underline flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-blue-50`}
          >
            <Home size={16} />
            {!collapsed && <span>Нүүр хуудас руу</span>}
          </Link>
          <Button
            onClick={logout}
            color="error"
            variant="outlined"
            startIcon={<LogOut size={18} />}
            fullWidth
            className={`!rounded-xl ${collapsed ? '!justify-center' : '!justify-start'}`}
          >
            {!collapsed ? 'Гарах' : ''}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
