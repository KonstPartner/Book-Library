import React, { FormEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  onClick,
  disabled,
  className,
  noLoadingText,
}: {
  children: ReactNode;
  onClick: (() => void) | ((e: FormEvent) => void);
  disabled?: boolean;
  className?: string;
  noLoadingText?: boolean;
}) => {
  return (
    <button
      className={twMerge(
        'flex flex-row items-center rounded-lg px-7 py-3 text-lg transition-all duration-300',
        disabled && 'opacity-50 cursor-not-allowed',
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
