'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import BooksList from './BooksList';
import fetchData from '@/utils/fetchData';
import { RANDOM_BOOKS_URL } from '@/constants/apiSources';
import Spinner from '@/components/Spinner';
import BookType from '@/types/BookType';

const RandomBooksList = () => {
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = async () => {
    setIsLoading(true);
    const data = await fetchData(`${RANDOM_BOOKS_URL}?limit=10`);
    if (data?.data) {
      console.log(data.data)
      setBooks(data.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mx-auto font-bold text-center my-4 w-full">
        Random Books
      </h1>
      <Button
        className="m-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        disabled={isLoading}
        onClick={fetchRandomBooks}
      >
        Get Books
      </Button>
      {isLoading ? (
        <Spinner className="mx-auto my-16" />
      ) : (
        <BooksList books={books} />
      )}
    </div>
  );
};

export default RandomBooksList;
