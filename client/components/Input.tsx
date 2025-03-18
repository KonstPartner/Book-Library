import { Eye, EyeOff } from 'lucide-react';
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
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
  type: initialType,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType =
    initialType === 'password' && isPasswordVisible
      ? 'text'
      : initialType || 'text';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        className={twMerge(
          'w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 border border-white/20 rounded-lg',
          'backdrop-blur-sm focus:border-transparent',
          'text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400',
          'transition-all duration-300 shadow-sm hover:shadow-md',
          'text-sm sm:text-base',
          initialType === 'password' ? 'pr-10' : '',
          className
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ''}
        {...props}
      />
      {initialType === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
};

export default Input;
