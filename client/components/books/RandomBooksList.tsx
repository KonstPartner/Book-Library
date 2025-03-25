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
import { toast } from 'react-toastify';

const RandomBooksList = ({
  initialBooks,
  fetchError,
}: {
  initialBooks: BookType[] | null;
  fetchError: string | null;
}) => {
  const [books, setBooks] = useState<BookType[] | []>(initialBooks || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

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
    <div className="flex flex-col gap-3">
      <Button
        className="random-books-button"
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
