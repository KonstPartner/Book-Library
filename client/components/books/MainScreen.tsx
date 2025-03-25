import React from 'react';
import BooksGridIcons from '../BooksGridIcons';
import RandomBooksList from './RandomBooksList';
import StartBtn from './StartBtn';
import { RANDOM_BOOKS_URL } from '@/constants/apiSources';
import { randomBooksCardsLimit } from '@/constants/cardsLimit';
import fetchData from '@/utils/fetchData';
import BookType from '@/types/BookType';

const MainScreen = async () => {
  
    let books: BookType[] | null = null;
    let error: string | null = null;
  
    try {
      const response = await fetchData(`${RANDOM_BOOKS_URL}?limit=${randomBooksCardsLimit}`);
      books = response?.data ?? null;
  
      if (books === null) {
        error = 'No books found';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to fetch book';
    }
  
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
            <StartBtn />
          </div>
        </div>
      </div>
      <BooksGridIcons />
      <RandomBooksList initialBooks={books} fetchError={error} />
    </div>
  );
};

export default MainScreen;
