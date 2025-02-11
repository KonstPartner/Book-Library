import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
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
        'border dark:bg-transparent dark:border-gray-500',
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
