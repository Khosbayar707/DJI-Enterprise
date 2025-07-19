'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { User } from '@/generated/prisma';
import LoadingText from './LoadingText';
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/ui/search';
import { useSearchDebounce } from './debounce/search';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const hoverVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const HeaderMain = () => {
  const pathname = usePathname();
  const router = useRouter();
  const initialSearch = useSearchParams().get('search') || '';
  const [user, setUser] = useState<User>();
  const [logging, setLogging] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchType, setSearchType] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 700);

  type SubItem = { label: string; path: string };
  type NavItem = { label: string; path: string; subitems?: SubItem[] };

  const navItems: {
    label: string;
    items: NavItem[];
  }[] = [
    {
      label: 'DJI',
      items: [
        {
          label: 'Drone',
          path: '/dji',
          subitems: [
            { label: 'Agriculture', path: '/dji?type=Agriculture' },
            { label: 'Enterprise', path: '/dji?type=Enterprise' },
            { label: 'Consumer', path: '/dji?type=Consumer' },
          ],
        },
        {
          label: 'Payload',
          path: '/payload',
          subitems: [
            { label: 'Program', path: '/payload?type=Program' },
            { label: 'Payload and Camera', path: '/payload?type=Payload+and+Camera' },
          ],
        },
      ],
    },
    {
      label: 'Garmin',
      items: [
        { label: 'Smartwatch', path: '/garmin?type=SMARTWATCH' },
        { label: 'GPS', path: '/garmin?type=GPS' },
      ],
    },
    {
      label: 'Геодезийн багаж',
      items: [
        { label: 'GNSS хүлээн авагч', path: '/hitarget?type=GNSS' },
        { label: 'Тотал станц', path: '/hitarget?type=TOTAL_STATION' },
        { label: 'Теодолит', path: '/hitarget?type=THEODOLITE' },
        { label: 'Автомат нивелир', path: '/hitarget?type=AUTO_LEVEL' },
      ],
    },
  ];

  const searchTypeOptions = useMemo(
    () => ['Agriculture', 'Enterprise', 'Consumer', 'Program', 'Payload and Camera', 'Equipment'],
    []
  );

  const logout = useCallback(async () => {
    setLogging(true);
    try {
      const res = await axios.get('/api/auth/logout');
      if (res.data.success) setUser(undefined);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLogging(true);
      try {
        const res = await axios.get('/api/auth/current-user');
        if (res.data.success) setUser(res.data.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLogging(false);
      }
    };
    fetchUser();
  }, [pathname]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      const query = new URLSearchParams();
      query.set('search', debouncedSearchQuery);
      if (searchType) query.set('type', searchType);
      if (searchType === 'Payload and Camera' || searchType === 'Program') {
        router.push(`/payload?${query.toString()}`);
      } else {
        router.push(`/dji?${query.toString()}`);
      }
    }
  }, [debouncedSearchQuery, searchType, router]);

  const renderSearch = (
    <div className="flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md w-full">
      <div className="relative flex items-center w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
        <StyledInputBase
          className="w-full pl-10 pr-3 py-2 focus:outline-none rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Хайх"
        />
      </div>
      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="w-full sm:w-[150px] bg-white border border-gray-300 rounded-md text-sm">
          <SelectValue placeholder="Төрөл" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg border rounded-md">
          <SelectGroup>
            {searchTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/image/dji-3.svg" alt="Logo" width={28} height={28} />
            <span className="text-lg font-bold hidden sm:block">Enterprise Mongolia</span>
          </Link>

          <div className="hidden lg:flex space-x-6">{renderSearch}</div>

          <div className="hidden lg:flex space-x-4">
            {logging ? (
              <LoadingText />
            ) : user ? (
              <>
                <Link href="/profile" className="text-sm truncate max-w-[120px]">
                  {user.email}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Гарах
                </button>
              </>
            ) : (
              <Link
                href={`/auth/login?redir=${pathname}`}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                Нэвтрэх
              </Link>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden bg-white shadow-lg border-t"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="p-4 space-y-4">
            {renderSearch}
            <nav className="space-y-2">
              {navItems.map((nav, idx) => (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full px-4 py-2 text-left text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100">
                        {nav.label}
                        <ChevronDownIcon className={`w-5 h-5 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="pl-4 space-y-1">
                        {nav.items.map((item, i) => (
                          <div key={i}>
                            <Link
                              href={item.path}
                              className="block px-4 py-1 text-sm hover:text-blue-600"
                            >
                              {item.label}
                            </Link>
                            {item.subitems?.map((sub, j) => (
                              <Link
                                key={j}
                                href={sub.path}
                                className="block ml-4 px-4 py-1 text-sm text-gray-600 hover:text-blue-500"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </nav>
            <div>
              {user ? (
                <>
                  <Link href="/profile" className="block px-4 py-2">
                    {user.email}
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Гарах
                  </button>
                </>
              ) : (
                <Link
                  href={`/auth/login?redir=${pathname}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Нэвтрэх
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderMain;
