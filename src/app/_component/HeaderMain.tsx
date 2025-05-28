"use client";

import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dji", label: "DJI", items: ["DJI Enterprise"] },
  { href: "/autel", label: "Autel", items: ["Autel EVO", "Autel Robotics"] },
  { href: "/garmin", label: "Garmin", items: ["Aviation", "Marine"] },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const HeaderMain = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isLoggedIn = true;
  const userInfo = {
    name: "John Doe",
    pfp: "/default-profile.png",
    id: "123",
  };

  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  const logout = () => {
    console.log("Logging out");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <img
                src="/image/dji-3.svg"
                alt="DJI Logo"
                className="h-5 transition-transform duration-300 hover:scale-105"
              />
              <span className="text-base font-bold tracking-tight text-gray-900 uppercase">
                Enterprise
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center space-x-6">
            {navItems.map((nav, idx) => (
              <Menu
                as="div"
                key={idx}
                className="relative inline-block text-left"
              >
                <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600 focus:outline-none relative group">
                  {nav.label}
                  <ChevronDownIcon
                    className="ml-1 h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
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
                              href={nav.href}
                              className={`${
                                active
                                  ? "bg-gray-50 text-blue-600"
                                  : "text-gray-700"
                              } block px-4 py-2 text-sm font-medium transition-colors duration-150`}
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
            <div className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
              <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {isLoggedIn ? (
              <>
                <Link href={`/profile/${userInfo.id}`}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <img
                      src={userInfo.pfp}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {userInfo.name}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer"
                >
                  Гарах
                </button>
              </>
            ) : (
              <Link href="/account">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer">
                  Нэвтрэх / Бүртгүүлэх
                </button>
              </Link>
            )}

            <Link href="/where-to-buy">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer">
                Холбоо барих
              </button>
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => {
                console.log("Toggling isMobileMenuOpen:", !isMobileMenuOpen);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden px-4 py-4 z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((nav, idx) => (
                <Disclosure key={idx} as="div" className="py-2">
                  <DisclosureButton
                    as="button"
                    className="flex justify-between w-full px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none relative group"
                    onClick={() =>
                      console.log(`Toggling Disclosure for ${nav.label}`)
                    }
                  >
                    {nav.label}
                    <ChevronDownIcon
                      className="h-4 w-4 text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 pt-2">
                    {nav.items.map((item, i) => (
                      <Link
                        key={i}
                        href={nav.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
              <motion.div
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-600 transition-all duration-300"
                variants={hoverVariants}
                whileHover="hover"
              >
                <MagnifyingGlassIcon className="text-blue-600 h-5 w-5" />
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Хайлт хийх..."
                />
              </motion.div>
              {isLoggedIn ? (
                <div className="flex flex-col gap-4">
                  <Link href={`/profile/${userInfo.id}`}>
                    <motion.div
                      className="flex items-center gap-2 bg-gray-50 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300"
                      variants={hoverVariants}
                      whileHover="hover"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img
                        src={userInfo.pfp}
                        alt="Profile"
                        className="rounded-full w-8 h-8 border-2 border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {userInfo.name}
                      </span>
                    </motion.div>
                  </Link>
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    <ArrowRightStartOnRectangleIcon className="text-blue-600 h-5 w-5" />
                    Гарах
                  </motion.button>
                  <Link href="/where-to-buy">
                    <motion.div
                      className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-300 text-center"
                      variants={hoverVariants}
                      whileHover="hover"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Холбоо барих
                    </motion.div>
                  </Link>
                </div>
              ) : (
                <Link href="/account">
                  <motion.div
                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-all duration-300 text-center"
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
    </>
  );
};

export default HeaderMain;
