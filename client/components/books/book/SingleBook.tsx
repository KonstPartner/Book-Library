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

const SingleBook = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [book, setBook] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBook = useCallback(async () => {
    const data = await fetchData(`${ALL_BOOKS_URL}/${id}`);
    if (data?.data) setBook(data.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id, fetchBook]);

  if (isLoading) {
    return <Spinner className="mx-auto my-16" />;
  }

  if (!book) {
    return <p>No book found with id {id}</p>;
  }

  return (
    <>
      <Button
      className='border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-0'
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchBook();
        }}
      >
        <RefreshCcw />
      </Button>
      <BookInfo book={book} />;
    </>
  );
};

export default SingleBook;
