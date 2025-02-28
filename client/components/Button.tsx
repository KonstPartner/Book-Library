import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  onClick,
  disabled,
  className,
  noLoadingText,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  noLoadingText?: boolean;
}) => {
  return (
    <button
      className={twMerge(
        'flex flex-row items-center shadow-lg rounded-xl px-7 py-3 text-lg border-2 w-fit',
        'border-black dark:border-gray-400',
        'hover:shadow-none',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled && !noLoadingText ? 'Loading...' : children}
    </button>
  );
};

export default Button;
