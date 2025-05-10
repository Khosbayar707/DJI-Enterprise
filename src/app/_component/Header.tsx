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
} from "@heroicons/react/20/solid";

const navItems = [
  { title: "Үйл ажиллагаа", items: ["Option 1", "Option 2"] },
  { title: "DJI", items: ["DJI Enterprise", "DJI Agriculture"] },
  { title: "Autel", items: ["Autel EVO", "Autel Robotics"] },
  { title: "Garmin", items: ["Aviation", "Marine"] },
  { title: "Холбоо барих", items: ["Contact Form", "Support"] },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <img
            src="/dji-logo.png"
            alt="DJI Logo"
            className="h-5 transition-transform duration-300 hover:scale-105"
          />
          <span className="text-base font-bold tracking-tight text-gray-900 uppercase">
            Enterprise
          </span>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map((nav, idx) => (
            <Menu
              as="div"
              key={idx}
              className="relative inline-block text-left"
            >
              <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-800 transition-colors duration-200 hover:text-red-600 focus:outline-none relative group">
                {nav.title}
                <ChevronDownIcon
                  className="ml-1 h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
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
                          <a
                            href="#"
                            className={`${
                              active
                                ? "bg-gray-50 text-red-600"
                                : "text-gray-700"
                            } block px-4 py-2 text-sm font-medium transition-colors duration-150`}
                          >
                            {item}
                          </a>
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
          <button className="p-2 text-gray-600 hover:text-red-600 focus:outline-none">
            <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Where to Buy
          </button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-red-600 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <Disclosure
        as="div"
        className={`${isOpen ? "block" : "hidden"} lg:hidden`}
      >
        <DisclosurePanel className="px-4 pt-2 pb-4 bg-white shadow-sm">
          {navItems.map((nav, idx) => (
            <Disclosure as="div" key={idx} className="py-2">
              <DisclosureButton className="flex justify-between w-full px-3 py-2 text-sm font-semibold text-gray-800 hover:text-red-600 focus:outline-none relative group">
                {nav.title}
                <ChevronDownIcon
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 pt-2">
                {nav.items.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600"
                  >
                    {item}
                  </a>
                ))}
              </DisclosurePanel>
            </Disclosure>
          ))}
          <div className="flex flex-col space-y-3 pt-4">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600">
              <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Language
            </button>
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600">
              <MagnifyingGlassIcon
                className="h-5 w-5 mr-2"
                aria-hidden="true"
              />
              Search
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
              Where to Buy
            </button>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>
  );
};

export default Header;
