'use client';

import React, { useEffect, useState } from 'react';
import BookType from '@/types/BookType';
import Button from './Button';
import BooksList from './BooksList';
import fetchData from '@/utils/fetchData';
import { RANDOM_BOOKS_URL } from '@/constants/apiSources';

const RandomBooksList = () => {
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = async () => {
    setIsLoading(true);
    const data = await fetchData(RANDOM_BOOKS_URL);
    if (data) {
      setBooks(data.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mx-autotext-2xl font-bold text-center my-4 w-full">
        Random Books
      </h1>
      <Button disabled={isLoading} onClick={fetchRandomBooks}>
        Get Books
      </Button>
      {!isLoading && <BooksList books={books} />}
    </div>
  );
};

export default RandomBooksList;
