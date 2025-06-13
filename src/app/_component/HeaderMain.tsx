'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
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

const navItems = [
  { href: '/dji', label: 'DJI', items: ['DJI Enterprise'] },
  { href: '/garmin', label: 'Garmin', items: ['Smartwatch', 'GPS'] },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const HeaderMain = () => {
  const pathname = usePathname();
  const search = useSearchParams().get('search');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [logging, setLogging] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search || '');
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 1000);
  const router = useRouter();

  const logout = useCallback(async () => {
    setLogging(true);
    try {
      const res = await axios.get('/api/auth/logout');
      if (res.data.success) {
        setUser(undefined);
      }
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLogging(true);
      try {
        const res = await axios.get('/api/auth/current-user');
        if (res.data.success) {
          setUser(res.data.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLogging(false);
      }
    };
    fetchData();
  }, [pathname, refresh]);

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const res = await axios.get('/api/auth/refresh-token');
        if (res.data.success) {
          setRefresh((prev) => !prev);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRefresh();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      router.push(`/?search=${debouncedSearchQuery}`);
    }
  }, [debouncedSearchQuery, router]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/image/dji-3.svg"
              alt="DJI Logo"
              width={24}
              height={24}
              className="h-5 w-auto transition-transform duration-300 hover:scale-105"
            />
            <span className="text-base font-bold tracking-tight text-gray-900 uppercase">
              Enterprise
            </span>
          </div>
        </Link>

        <nav
          className="hidden lg:flex flex-1 justify-center space-x-6"
          role="navigation"
          aria-label="Main Navigation"
        >
          {navItems.map((nav, idx) => (
            <Menu as="div" key={idx} className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 relative group">
                {nav.label}
                <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none">
                  <div className="py-1">
                    {nav.items.map((item, i) => (
                      <MenuItem key={i}>
                        {({ active }) => (
                          <Link
                            href={
                              nav.label === 'Garmin'
                                ? `${nav.href}?type=${item.toUpperCase()}`
                                : nav.href
                            }
                            className={`${
                              active ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                            } block px-4 py-2 text-sm font-medium`}
                          >
                            {item}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Search>
            <SearchIconWrapper>
              <label
                htmlFor="desktop-search"
                className="p-2 text-gray-600 hover:text-blue-600 cursor-pointer text-sm"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </label>
            </SearchIconWrapper>
            <StyledInputBase
              id="desktop-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Хайх"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {logging ? (
            <LoadingText />
          ) : user ? (
            <>
              <Link href={`/profile`}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                  <span className="text-sm font-medium text-gray-800">{user.email}</span>
                </div>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Гарах
              </button>
            </>
          ) : (
            <Link href={`/auth/login?redir=${pathname}`}>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer">
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
              <Disclosure key={idx} as="div" className="py-2">
                {({ open }) => (
                  <>
                    <DisclosureButton
                      className="flex justify-between w-full px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 relative group"
                      aria-expanded={open}
                    >
                      {nav.label}
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    </DisclosureButton>
                    <DisclosurePanel className="pl-4 pt-2">
                      {nav.items.map((item, i) => (
                        <Link
                          key={i}
                          href={
                            nav.label === 'Garmin'
                              ? `${nav.href}?type=${item.toUpperCase()}`
                              : nav.href
                          }
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}

            <motion.div
              className="flex items-center gap-2 bg-gray-100 text-sm rounded-full px-3 py-2 shadow-sm border border-gray-300"
              variants={hoverVariants}
              whileHover="hover"
            >
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Хайх"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </motion.div>

            {logging ? (
              <LoadingText />
            ) : user ? (
              <div className="flex flex-col gap-4">
                <Link href={`/profile`}>
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
                  className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium hover:bg-blue-700 flex items-center gap-2 justify-center cursor-pointer"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <ArrowRightStartOnRectangleIcon className="text-blue-600 h-5 w-5" />
                  Гарах
                </motion.button>
              </div>
            ) : (
              <Link href={`/auth/login?redir=${pathname}`}>
                <motion.div
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 text-center cursor-pointer"
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
