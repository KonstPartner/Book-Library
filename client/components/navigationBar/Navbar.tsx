'use client';

import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import NavMenu from './NavMenu';
import NavLinks from './NavLinks';

const NAV_LINKS = [
  { href: '/', label: 'Random' },
  { href: '/books', label: 'Search' },
  { href: '/books/create', label: 'Create' },
];

const Navbar = () => {
  return (
    <nav className="flex bg-purple-600 dark:bg-purple-800 p-4 shadow-md">

      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className='flex gap-2'>
        <BookOpenText className='text-gray-100 dark:text-gray-200' size={34} />
          <h1 className="text-2xl font-bold text-gray-100 dark:text-gray-200">
            Book Library App
          </h1>
        </Link>
        <NavLinks links={NAV_LINKS} />
      </div>

      <NavMenu links={NAV_LINKS} />
    </nav>
  );
};

export default Navbar;
