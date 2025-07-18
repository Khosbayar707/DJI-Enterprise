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
    <div className="flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md relative z-30 w-full sm:w-auto">
      <div className="relative flex items-center w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
        <StyledInputBase
          className="w-full pl-10 pr-3 py-2 sm:min-w-[200px] focus:outline-none rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Хайх"
        />
      </div>
      <div className="w-full sm:w-auto">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-full sm:w-[150px] bg-white border border-gray-300 rounded-md shadow-sm text-sm">
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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/image/dji-3.svg" alt="DJI Logo" width={28} height={28} />
              <span className="text-lg font-bold text-gray-900 hidden sm:block">
                Enterprise Mongolia
              </span>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-6 ml-8">
            {navItems.map((nav, idx) => (
              <Menu as="div" key={idx} className="relative">
                {({ open }) => (
                  <>
                    <MenuButton className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
                      {nav.label}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
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
                      <MenuItems className="absolute z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 space-y-1">
                        {nav.items.map((item, i) => (
                          <div key={i} className="space-y-1">
                            <Link
                              href={item.path}
                              className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                            >
                              {item.label}
                            </Link>
                            {Array.isArray(item.subitems) && item.subitems.length > 0 && (
                              <div className="ml-4 space-y-1 pl-2 border-l border-gray-100">
                                {item.subitems.map((sub, j) => (
                                  <Link
                                    key={j}
                                    href={sub.path}
                                    className="block px-4 py-1.5 text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded-md"
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
                  </>
                )}
              </Menu>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            {renderSearch}
            {logging ? (
              <LoadingText />
            ) : user ? (
              <>
                <motion.div whileHover="hover" variants={hoverVariants}>
                  <Link href="/profile">
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                        {user.email}
                      </span>
                    </div>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  whileHover="hover"
                  variants={hoverVariants}
                >
                  Гарах
                </motion.button>
              </>
            ) : (
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Link href={`/auth/login?redir=${pathname}`}>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Нэвтрэх
                  </button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          className="lg:hidden bg-white shadow-lg border-t border-gray-200"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {renderSearch}

            <nav className="space-y-2">
              {navItems.map((nav, idx) => (
                <Disclosure key={idx} as="div" className="border-b border-gray-100 pb-2">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full px-3 py-3 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                        {nav.label}
                        <ChevronDownIcon
                          className={`h-5 w-5 transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="pl-4 pt-1 space-y-1">
                        {nav.items.map((item, i) => (
                          <div key={i} className="space-y-1">
                            <Link
                              href={item.path}
                              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                            {Array.isArray(item.subitems) && item.subitems?.length > 0 && (
                              <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 pl-3">
                                {item.subitems.map((sub, j) => (
                                  <Link
                                    key={j}
                                    href={sub.path}
                                    className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </nav>

            <div className="pt-2 space-y-3">
              {logging ? (
                <LoadingText />
              ) : user ? (
                <>
                  <motion.div
                    whileHover="hover"
                    variants={hoverVariants}
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <span>{user.email}</span>
                      <span className="text-blue-600">Профайл</span>
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                    whileHover="hover"
                    variants={hoverVariants}
                  >
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
                    Гарах
                  </motion.button>
                </>
              ) : (
                <motion.div
                  whileHover="hover"
                  variants={hoverVariants}
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link
                    href={`/auth/login?redir=${pathname}`}
                    className="block w-full px-4 py-3 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  >
                    Нэвтрэх / Бүртгүүлэх
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderMain;
