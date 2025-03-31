import React from 'react';
import BooksGridIcons from '../BooksGridIcons';
import RandomBooksList from './RandomBooksList';
import StartBtn from './StartBtn';
import { RANDOM_BOOKS_URL } from '@/constants/apiSources';
import { randomBooksCardsLimit } from '@/constants/cardsLimit';
import fetchData from '@/utils/fetchData';
import BookType from '@/types/BookType';
import EncouragePhrases from './EncouragePhrases';

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
    <div className="min-h-screen bg-gradient-to-tl from-indigo-300 via-gray-200 to-teal-300 dark:from-indigo-950 dark:via-gray-900 dark:to-teal-950 p-6 overflow-hidden relative">
      <div className="flex flex-col max-w-5xl md:w-[90%] mx-auto relative">
        <div className="flex justify-end">
          <div className="w-full gradient-blur-container p-8 md:py-20 text-center animate-slide-in-from-right">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl main-tiptle">
              Welcome to the Book Library
            </h1>
            <EncouragePhrases />
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