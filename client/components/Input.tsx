import React, { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <input
      type="text"
      className={twMerge('border dark:bg-transparent dark:border-gray-500', className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder ? placeholder : ''}
    />
  );
};

export default Input;
