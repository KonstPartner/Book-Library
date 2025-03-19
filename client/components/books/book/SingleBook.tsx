'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';
import BookInfo from '@/components/books/book/BookInfo';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const SingleBook = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [book, setBook] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBook = useCallback(async () => {
    fetchDataWrapper(async () => {
      const data = await fetchData(`${ALL_BOOKS_URL}/${id}`);
      if (data?.data) setBook(data.data);
    }, setIsLoading);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id, fetchBook]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950  p-4 overflow-hidden relative">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950  p-4 overflow-hidden relative">
        <p>No book found with id {id}</p>
      </div>
    );
  }

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950  p-4 overflow-hidden relative">
        <div className="mx-auto">
          <Button
            className="border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-1"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              fetchBook();
            }}
          >
            <RefreshCcw />
          </Button>
          <BookInfo book={book} />
        </div>
      </div>
    </StoreProvider>
  );
};

export default SingleBook;
