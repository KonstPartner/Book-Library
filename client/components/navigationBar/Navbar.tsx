'use client';

import React, { useEffect, useState } from 'react';
import {
  BookMarked,
  BookOpenText,
  BookPlus,
  SquareUserRound,
  Tent,
} from 'lucide-react';
import Link from 'next/link';
import NavMenu from './NavMenu';
import NavLinks from './NavLinks';
import ToggleTheme from './ToggleTheme';
import ThemeType from '@/types/ThemeType';

const NAV_LINKS = [
  { href: '/', label: 'Main', icon: <Tent /> },
  { href: '/books', label: 'Books', icon: <BookMarked /> },
  { href: '/books/create', label: 'Create', icon: <BookPlus /> },
  { href: '/users/profile', label: 'Profile', icon: <SquareUserRound /> },
];

const Navbar = () => {
  const [theme, setTheme] = useState<ThemeType>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    const initialTheme =
      savedTheme && ['light', 'dark', 'system'].includes(savedTheme)
        ? savedTheme
        : 'system';
    setTheme(initialTheme);

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (initialTheme === 'system') {
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      document.documentElement.classList.toggle(
        'dark',
        initialTheme === 'dark'
      );
    }
  }, []);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (theme === 'system') {
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <nav className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 dark:from-purple-900/90 dark:to-indigo-900/90 border-b border-white/20 shadow-lg">
      <div className="md:container mx-auto flex items-center justify-between px-4 py-3 md:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpenText
            className="text-gray-100 dark:text-indigo-400 transition-transform duration-300 group-hover:rotate-12"
            size={34}
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 bg-gradient-to-r from-gray-100 to-blue-200 dark:from-indigo-400 dark:to-teal-300 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            Book Library App
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ToggleTheme theme={theme} setTheme={setTheme} />
          </div>
          <span className="hidden sm:block w-px h-8 bg-white/40 backdrop-blur-sm rounded-full mx-5" />
          <NavLinks links={NAV_LINKS} />
          <NavMenu links={NAV_LINKS} theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
