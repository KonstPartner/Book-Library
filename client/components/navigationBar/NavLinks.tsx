import Link from 'next/link';
import React from 'react';

const NavLinks = ({
  links,
}: {
  links: {
    href: string;
    label: string;
  }[];
}) => {
  return (
    <div className="hidden sm:flex text-xl space-x-8">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="border-b-2 border-transparent text-gray-100 dark:text-gray-200 hover:text-white hover:border-white"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
