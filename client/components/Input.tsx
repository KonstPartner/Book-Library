import React, { ChangeEvent } from 'react';

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
      className={`border ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder ? placeholder : ''}
    />
  );
};

export default Input;
