import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value = '',
  onChange,
  placeholder,
  className,
  type,
  ...props
}: InputProps) => {
  return (
    <input
      type={type || 'text'}
      className={twMerge(
        'w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 rounded-lg',
        'backdrop-blur-sm focus:border-transparent',
        'text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        'text-sm sm:text-base',
        className
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder ? placeholder : ''}
      {...props}
    />
  );
};

export default Input;