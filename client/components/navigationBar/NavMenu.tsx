'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlignJustify } from 'lucide-react';
import ToggleTheme from './ToggleTheme';

const NavMenu = ({
  links,
  theme,
  setTheme,
}: {
  links: {
    href: string;
    label: string;
  }[];
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="lg:hidden p-2 text-gray-100 dark:text-gray-200 rounded-lg hover:bg-white/10 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignJustify size={28} />
      </button>

      <div
        className={`lg:hidden absolute top-16 right-4 w-48 bg-purple-700/20 dark:bg-purple-900/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-3 flex flex-col space-y-2 z-50 transform transition-all duration-200 ease-in-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <>
          <div className="sm:hidden mx-auto">
            <ToggleTheme theme={theme} setTheme={setTheme} />
          </div>
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2 text-lg text-gray-100 dark:text-gray-200 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 scale-105'
                    : 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </>
      </div>
    </>
  );
};

export default NavMenu;
