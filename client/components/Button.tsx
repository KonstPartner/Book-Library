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
      className={`flex flex-row items-center hover:bg-gray-50 hover:shadow-none border-black border-2 shadow-lg rounded-full m-auto ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled ? 'Loading...' : children}
    </button>
  );
};

export default Button;
