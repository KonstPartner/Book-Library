'use client';

import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import NavMenu from './NavMenu';
import NavLinks from './NavLinks';

const NAV_LINKS = [
  { href: '/', label: 'Main' },
  { href: '/books', label: 'Books' },
  { href: '/books/create', label: 'Create' },
];

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 dark:from-purple-800/90 dark:to-blue-800/90 border-b border-white/20 shadow-lg">
      <div className="md:container mx-auto flex items-center justify-between px-4 py-3 md:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpenText
            className="text-gray-100 dark:text-gray-200 transition-transform duration-300 group-hover:rotate-12"
            size={34}
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 dark:text-gray-200 bg-gradient-to-r from-gray-100 to-blue-200 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            Book Library App
          </h1>
        </Link>
        <NavLinks links={NAV_LINKS} />
        <NavMenu links={NAV_LINKS} />
      </div>
    </nav>
  );
};

export default Navbar;