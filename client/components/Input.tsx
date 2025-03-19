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
    <div className="input-container">
      <input
        type={inputType}
        className={twMerge(
          'input-field',
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
          className="toggle-password-button"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
};

export default Input;
