'use client';

import BookInfo from '@/components/books/book/BookInfo';
import Spinner from '@/components/Spinner';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import fetchData from '@/utils/fetchData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleBook = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [book, setBook] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await fetchData(`${ALL_BOOKS_URL}/${id}`);
      if (data?.data) setBook(data.data);
      setIsLoading(false);
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner className='mx-auto my-16'/>;
  }

  if (!book) {
    return <p>No book found with id {id}</p>;
  }

  return <BookInfo book={book} />;
};

export default SingleBook;
