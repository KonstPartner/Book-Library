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
      <div className="flex flex-col max-w-5xl mx-auto relative">
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 bg-gradient-to-br from-white/20 to-gray-100/20 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 dark:border-gray-700/40 p-8 text-center animate-slide-in-from-right">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-gray-400 to-teal-500 dark:from-indigo-400 dark:via-gray-200 dark:to-teal-400 bg-clip-text text-transparent py-2">
              Welcome to the Book Library
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-base my-10 text-right">
              Discover a world of books, explore random picks, rate your
              favorites, and share your thoughts with a vibrant community of
              readers.
            </p>
            <Button
              className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
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
