import React from 'react';
import { Loader } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Spinner = ({ className }: { className?: string }) => {
  return <Loader className={twMerge('animate-spin duration-100', className)} />;
};

export default Spinner;
