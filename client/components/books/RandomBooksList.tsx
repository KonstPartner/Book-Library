'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import BooksList from './BooksList';
import fetchData from '@/utils/fetchData';
import { RANDOM_BOOKS_URL } from '@/constants/apiSources';
import Spinner from '@/components/Spinner';
import BookType from '@/types/BookType';
import { randomBooksCardsLimit } from '@/constants/cardsLimit';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const RandomBooksList = () => {
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = async () => {
    fetchDataWrapper(async () => {
      const data = await fetchData(
        `${RANDOM_BOOKS_URL}?limit=${randomBooksCardsLimit}`
      );
      if (data?.data) {
        setBooks(data.data);
      }
    }, setIsLoading);
  };

  return (
    <div className='flex flex-col gap-3'>
      <Button
        className="mx-auto px-16 py-5 bg-gradient-to-r from-indigo-500 via-blue-400 to-teal-500 dark:from-indigo-400 dark:via-blue-400 dark:to-teal-400 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:via-blue-400 hover:to-teal-600 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:via-gray-400 disabled:hover:to-teal-500 relative overflow-hidden text-2xl"
        disabled={isLoading}
        onClick={fetchRandomBooks}
      >
        Get Books
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-shine" />
      </Button>

      {isLoading ? (
        <Spinner className="mx-auto my-16 w-12 h-12 text-teal-500 animate-spin" />
      ) : (
        <BooksList books={books} />
      )}
    </div>
  );
};

export default RandomBooksList;
