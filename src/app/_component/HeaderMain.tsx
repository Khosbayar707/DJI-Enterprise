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
  UserIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import type { User } from '@/generated/prisma';
import LoadingText from './LoadingText';
import { StyledInputBase } from '@/components/ui/search';
import { useSearchDebounce } from './debounce/search';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@mui/material';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const hoverVariants = { hover: { scale: 1.02, transition: { duration: 0.18 } } };

const drawerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

// ThemeToggle Component
function ThemeToggle({ size = 20 }: { size?: number }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="relative flex items-center justify-center
                 rounded-full p-2
                 text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-zinc-800
                 transition-colors"
    >
      {isDark ? (
        <SunIcon style={{ width: size, height: size }} />
      ) : (
        <MoonIcon style={{ width: size, height: size }} />
      )}
    </button>
  );
}

export default function HeaderMain() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const initialSearch = useSearchParams().get('search') || '';
  const { theme } = useTheme();

  const [user, setUser] = useState<User>();
  const [logging, setLogging] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchType, setSearchType] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 700);

  type SubItem = { label: string; path: string };
  type NavItem = { label: string; path: string; subitems?: SubItem[] };

  const navGroups: { label: string; items: NavItem[] }[] = [
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
    { label: 'Дронын сургалт', items: [{ label: 'Training', path: '/trainings' }] },
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

  const searchTypeLabelMap: { [key: string]: string } = {
    'Agriculture drone': 'Agriculture',
    'Enterprise drone': 'Enterprise',
    'Consumer drone': 'Consumer',
    'Дронын нэмэлт хэрэгсэл': 'Payload and Camera',
    'Нэмэлт программ': 'Program',
    'GNSS хүлээн авагч': 'GNSS',
    'Тотал станц': 'TOTAL_STATION',
    'Теодолит багаж': 'THEODOLITE',
    'Автомат нивелир': 'AUTO_LEVEL',
  };
  const searchTypeOptions = useMemo(() => Object.keys(searchTypeLabelMap), []);

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
    if (!debouncedSearchQuery) return;
    const mappedType = searchTypeLabelMap[searchType];
    const query = new URLSearchParams();
    query.set('search', debouncedSearchQuery);

    if (['Payload and Camera', 'Program'].includes(mappedType)) {
      router.push(`/payload?${query.toString()}`);
    } else if (['GNSS', 'TOTAL_STATION', 'THEODOLITE', 'AUTO_LEVEL'].includes(mappedType)) {
      router.push(`/hitarget?${query.toString()}`);
    } else {
      router.push(`/dji?${query.toString()}`);
    }
  }, [debouncedSearchQuery, searchType, router]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isMobileMenuOpen) root.classList.add('overflow-hidden');
    else root.classList.remove('overflow-hidden');
    return () => root.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  const renderSearch = (
    <div className="flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md relative w-full sm:w-auto">
      <div className="relative flex items-center w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
        <StyledInputBase
          className="w-full pl-10 pr-3 py-2 sm:min-w-[200px] focus:outline-none rounded-md text-[11px] sm:text-sm dark:bg-zinc-800 dark:text-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Хайх"
          inputProps={{ 'aria-label': 'Search', autoComplete: 'off' }}
        />
      </div>
      <div className="w-full sm:w-auto">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-full sm:w-[170px] bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm text-[11px] sm:text-sm dark:text-gray-200">
            <SelectValue placeholder="Төрөл" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="z-[60] bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 rounded-md"
          >
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

  const isActive = (path: string) => pathname === path;

  const headerBlurClass =
    isMobileMenuOpen || showMobileSearch || showDesktopSearch
      ? 'bg-white dark:bg-zinc-900 supports-[backdrop-filter]:bg-white dark:supports-[backdrop-filter]:bg-zinc-900 shadow-sm'
      : 'bg-white/85 dark:bg-zinc-900/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-100 dark:border-zinc-800 ${headerBlurClass}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex lg:flex-wrap h-auto min-h-14 sm:min-h-16 items-center justify-between gap-x-2 py-1">
          <motion.div
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src={'/image/dji-3.svg'} alt="DJI Logo" width={28} height={28} />
              <span className="hidden sm:block text-[clamp(12px,1.6vw,18px)] font-bold text-gray-900 dark:text-white">
                Enterprise Mongolia
              </span>
              <span className="sm:hidden text-[clamp(11px,3.3vw,15px)] font-bold text-gray-900 dark:text-white">
                EM
              </span>
            </Link>
          </motion.div>

          <nav className="hidden xl:flex items-center gap-2 ml-6">
            {navGroups.map((group, idx) => {
              const single = group.items.length === 1 && !group.items[0].subitems;
              if (single) {
                return (
                  <motion.div key={idx} whileHover="hover" variants={hoverVariants}>
                    <Link
                      href={group.items[0].path}
                      className={`px-3 py-2 text-[clamp(11px,1.1vw,14px)] font-medium rounded-md transition-colors ${
                        isActive(group.items[0].path)
                          ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {group.label}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <Menu as="div" key={idx} className="relative">
                  {({ open }) => (
                    <>
                      <MenuButton className="group flex items-center px-3 py-2 text-[clamp(11px,1.1vw,14px)] font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md">
                        {group.label}
                        <ChevronDownIcon
                          className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <MenuItems className="absolute z-20 mt-2 w-64 origin-top-left rounded-xl bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none p-3 space-y-2">
                          {group.items.map((item, i) => (
                            <div key={i} className="space-y-2">
                              <Link
                                href={item.path}
                                className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {item.label}
                              </Link>
                              {Array.isArray(item.subitems) && item.subitems.length > 0 && (
                                <div className="ml-2 space-y-1 pl-2 border-l border-gray-100 dark:border-zinc-700">
                                  {item.subitems.map((sub, j) => (
                                    <Link
                                      key={j}
                                      href={sub.path}
                                      className="block px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md"
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
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowDesktopSearch((s) => !s);
              }}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Dark Mode Toggle for Desktop */}
            <ThemeToggle size={20} />

            {logging ? (
              <LoadingText />
            ) : user ? (
              <Menu as="div" className="relative">
                <MenuButton
                  className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                  aria-label="User menu"
                >
                  <UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none p-2">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`block px-3 py-2 rounded-md text-sm ${active ? 'bg-gray-100 dark:bg-zinc-800' : ''} text-gray-900 dark:text-white`}
                          onClick={() => setShowDesktopSearch(false)}
                        >
                          Профайл
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${active ? 'bg-gray-100 dark:bg-zinc-800' : ''} text-gray-900 dark:text-white`}
                        >
                          Гарах
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Link href={`/auth/login?redir=${pathname}`} aria-label="Нэвтрэх / Бүртгүүлэх">
                  <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <UserIcon className="h-5 w-5" />
                  </button>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="hidden lg:flex xl:hidden items-center gap-3 ml-auto flex-wrap">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowDesktopSearch((s) => !s);
              }}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>

            {/* Dark Mode Toggle for Medium Screens */}
            <ThemeToggle size={18} />

            {user ? (
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Link
                  href="/profile"
                  className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  <UserIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Link href={`/auth/login?redir=${pathname}`}>
                  <Button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-label="Menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowDesktopSearch((s) => !s);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-label="Toggle search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Dark Mode Toggle for Mobile */}
            <ThemeToggle size={18} />

            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {false && (
          <motion.div
            key="collapsible-search"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden pb-3 lg:px-2"
          >
            {renderSearch}
          </motion.div>
        )}
      </div>

      {(isMobileMenuOpen || showMobileSearch || showDesktopSearch) && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 bg-black/25 backdrop-blur-md"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setShowMobileSearch(false);
            setShowDesktopSearch(false);
          }}
        />
      )}

      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          className="xl:hidden fixed inset-x-0 top-14 sm:top-16 z-50 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-lg max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto"
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-4">
            <nav className="space-y-2">
              {navGroups.map((group, idx) => (
                <Disclosure
                  key={idx}
                  as="div"
                  className="border-b border-gray-100 dark:border-zinc-800 pb-2"
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full px-3 py-3 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md">
                        {group.label}
                        <ChevronDownIcon
                          className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                        />
                      </DisclosureButton>

                      <Transition
                        show={open}
                        enter="transition-all duration-300 ease-out"
                        enterFrom="opacity-0 -translate-y-1 max-h-0 blur-[2px]"
                        enterTo="opacity-100 translate-y-0 max-h-[400px] blur-0"
                        leave="transition-all duration-250 ease-in"
                        leaveFrom="opacity-100 translate-y-0 max-h-[400px] blur-0"
                        leaveTo="opacity-0 -translate-y-1 max-h-0 blur-[2px]"
                      >
                        <DisclosurePanel className="pl-4 pt-1 space-y-1 overflow-hidden">
                          {group.items.map((item, i) => (
                            <div key={i} className="space-y-1">
                              <Link
                                href={item.path}
                                className="block px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                              {Array.isArray(item.subitems) && item.subitems?.length > 0 && (
                                <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 dark:border-zinc-700 pl-3">
                                  {item.subitems.map((sub, j) => (
                                    <Link
                                      key={j}
                                      href={sub.path}
                                      className="block px-3 py-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md"
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
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </nav>

            <div className="pt-2 space-y-3">
              {/* Dark Mode Toggle in Mobile Menu */}
              <div className="px-4 py-3">
                <ThemeToggle size={20} />
              </div>

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
                      className="flex items-center justify-between w-full px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md"
                    >
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span>{user.email.split('@')[0]}</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400">Профайл</span>
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-3 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
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
                    className="flex items-center justify-center w-full px-4 py-3 text-xs sm:text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Нэвтрэх / Бүртгүүлэх
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {showDesktopSearch && (
        <motion.div
          key="desktop-search"
          className="block fixed inset-x-0 top-20 sm:top-24 z-50"
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mx-auto max-w-full sm:max-w-3xl px-4">
            <div className="rounded-xl border border-gray-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-zinc-900 p-3">
              <div className="flex items-center justify-between">
                {renderSearch}
                <button
                  onClick={() => setShowDesktopSearch(false)}
                  className="ml-2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
