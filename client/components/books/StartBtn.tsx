'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';
import Button from '@/components/Button';

const StartBtn = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/books');
  };

  return (
    <Button
      className="mt-6 white-button flex items-center gap-2 mx-auto"
      onClick={handleStartClick}
    >
      Start
      <FaArrowRight className="text-black" />
    </Button>
  );
};

export default StartBtn;
