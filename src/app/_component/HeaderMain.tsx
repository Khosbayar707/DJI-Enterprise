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
  hover: { scale: 1.05, transition: { duration: 0.3 } },
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
  ];

  const searchTypeOptions = useMemo(
    () => ['Agriculture', 'Enterprise', 'Consumer', 'Program', 'Payload and Camera'],
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
    <div className="flex items-center gap-2 px-3 py-2 rounded-md relative z-30">
      <div className="flex items-center text-gray-600">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>
      <StyledInputBase
        className="min-w-[150px] sm:min-w-[200px] focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Хайх"
      />
      <div className="relative z-50">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-[120px] bg-white border border-gray-300 rounded-md shadow-sm text-sm">
            <SelectValue placeholder="Төрөл" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-white shadow-lg border border-gray-200 rounded-md">
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
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/image/dji-3.svg" alt="DJI Logo" width={24} height={24} />
          <span className="text-base font-bold tracking-tight text-gray-900 uppercase">
            Enterprise
          </span>
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map((nav, idx) => (
            <Menu as="div" key={idx} className="relative">
              <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 group">
                {nav.label}
                <ChevronDownIcon className="ml-1 h-4 w-4" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-gray-200">
                  {nav.items.map((item, i) => (
                    <div key={i}>
                      <Link
                        href={item.path}
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                      {Array.isArray(item.subitems) && item.subitems.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subitems.map((sub, j) => (
                            <Link
                              key={j}
                              href={sub.path}
                              className="block px-4 py-1 text-sm text-gray-500 hover:text-blue-500"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {renderSearch}
          {logging ? (
            <LoadingText />
          ) : user ? (
            <>
              <Link href="/profile">
                <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <span className="text-sm font-medium text-gray-800">{user.email}</span>
                </div>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Гарах
              </button>
            </>
          ) : (
            <Link href={`/auth/login?redir=${pathname}`}>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Нэвтрэх / Бүртгүүлэх
              </button>
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-blue-600"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-md lg:hidden px-4 py-4 z-40"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((nav, idx) => (
              <Disclosure key={idx} as="div">
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex justify-between w-full px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600">
                      {nav.label}
                      <ChevronDownIcon className="h-4 w-4" />
                    </DisclosureButton>
                    <DisclosurePanel className="pl-4 pt-2">
                      {nav.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.path}
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}

            {renderSearch}

            {logging ? (
              <LoadingText />
            ) : user ? (
              <div className="flex flex-col gap-4">
                <Link href="/profile">
                  <motion.div
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-full hover:bg-gray-100"
                    variants={hoverVariants}
                    whileHover="hover"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-medium text-gray-800">{user.email}</span>
                  </motion.div>
                </Link>
                <motion.button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2 justify-center"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                  Гарах
                </motion.button>
              </div>
            ) : (
              <Link href={`/auth/login?redir=${pathname}`}>
                <motion.div
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 text-center"
                  variants={hoverVariants}
                  whileHover="hover"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Нэвтрэх эсвэл бүртгүүлэх
                </motion.div>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderMain;
