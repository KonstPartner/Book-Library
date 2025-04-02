import React from 'react';
import Button from './Button';
import { RefreshCcw } from 'lucide-react';

const RefreshBtn = ({
  isLoading,
  setIsLoading,
  callback,
}: {
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  callback: () => void;
}) => {
  return (
    <Button
      className="flex items-center gap-2 border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 ml-auto p-1"
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        callback();
      }}
    >
      <RefreshCcw className="w-5 h-5" />
      <span>Refresh</span>
    </Button>
  );
};

export default RefreshBtn;
