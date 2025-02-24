import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const NavMenu = ({
  links,
}: {
  links: {
    href: string;
    label: string;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden text-gray-100 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignJustify size={28} />
      </button>

      {isOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-purple-700 dark:bg-purple-900 text-gray-100 dark:text-gray-200 rounded-lg shadow-lg w-40 p-2 flex flex-col space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2 hover:bg-purple-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
      
    </>
  );
};

export default NavMenu;
