'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { RefreshCcw } from 'lucide-react';
import BookInfo from '@/components/books/book/BookInfo';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const SingleBook = ({
  initialBook,
  fetchError,
}: {
  initialBook: BookType | null;
  fetchError: string | null;
}) => {
  const params = useParams();
  const { id } = params as { id: string };
  const [book, setBook] = useState<BookType | null>(initialBook);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const fetchBook = useCallback(async () => {
    fetchDataWrapper(async () => {
      const data = await fetchData(`${ALL_BOOKS_URL}/${id}`);
      if (data?.data) setBook(data.data);
    }, setIsLoading);
  }, [id]);

  if (isLoading) {
    return (
      <div className="gradient-page-bg">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="gradient-page-bg">
        <p>{fetchError || `No book found with id ${id}`}</p>
      </div>
    );
  }

  return (
    <StoreProvider>
      <div className="gradient-page-bg">
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
