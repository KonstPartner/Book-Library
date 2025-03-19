'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../Button';
import { FaArrowRight } from 'react-icons/fa6';
import BooksGridIcons from '../BooksGridIcons';
import RandomBooksList from './RandomBooksList';

const MainScreen = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/books');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-indigo-300 via-gray-200 to-teal-300 dark:from-indigo-900 dark:via-gray-800 dark:to-teal-900 p-6 overflow-hidden relative">
      <div className="flex flex-col max-w-5xl md:w-[90%] mx-auto relative">
        <div className="flex justify-end">
          <div className="w-full gradient-blur-container p-8 md:py-20 text-center animate-slide-in-from-right">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl main-title">
              Welcome to the Book Library
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-base my-10 text-right">
              Discover a world of books, explore random picks, rate your
              favorites, and share your thoughts with a vibrant community of
              readers.
            </p>
            <Button
              className="mt-6 white-button flex items-center gap-2 mx-auto"
              onClick={handleStartClick}
            >
              Start
              <FaArrowRight className="text-black" />
            </Button>
          </div>
        </div>
      </div>
      <BooksGridIcons />
      <RandomBooksList />
    </div>
  );
};

export default MainScreen;
