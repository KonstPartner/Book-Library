import React, { ReactNode } from 'react';

const Button = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      className={`hover:bg-gray-50 hover:shadow-none border-black border-2 shadow-lg rounded-full py-5 px-16 text-2xl m-auto ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled ? 'Loading...' : children}
    </button>
  );
};

export default Button;
