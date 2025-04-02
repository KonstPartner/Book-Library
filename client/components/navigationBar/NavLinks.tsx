'use client';

import NavLinksType from '@/types/NavLinksType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({ links }: { links: NavLinksType[] }) => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center space-x-4">
      {links.map(({ href, label, icon }) => {
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
            <div className="flex gap-3 items-center">
              {icon}
              {label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
