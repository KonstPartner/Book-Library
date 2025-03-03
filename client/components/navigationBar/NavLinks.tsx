'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({
  links,
}: {
  links: {
    href: string;
    label: string;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex items-center space-x-4">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 text-lg text-gray-100 dark:text-gray-200 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
