'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import BookInfo from '@/components/books/book/BookInfo';
import Spinner from '@/components/Spinner';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import RefreshBtn from '@/components/RefreshBtn';

const SingleBook = ({
  initialBook,
  fetchError,
  initialRatings,
}: {
  initialBook: BookType | null;
  fetchError: string | null;
  initialRatings: RatingType[];
}) => {
  const params = useParams();
  const { id } = params as { id: string };
  const [book, setBook] = useState<BookType | null>(initialBook);
  const [ratings, setRatings] = useState<RatingType[]>(initialRatings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const fetchBook = useCallback(async () => {
    fetchDataWrapper(async () => {
      const bookData = await fetchData(`${ALL_BOOKS_URL}/${id}`);
      const ratingsData = await fetchData(`${ALL_BOOKS_URL}/${id}/ratings`);
      if (bookData?.data) {
        setBook(bookData.data);
        setRatings(ratingsData?.data?.data || []);
        toast.success('Book refreshed successfully');
      }
    }, setIsLoading);
  }, [id]);

  if (isLoading && !book) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-page-bg">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-page-bg">
        <p className="text-gray-600 dark:text-gray-400">
          {fetchError || `No book found with id ${id}`}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page-bg flex items-start justify-center py-8">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RefreshBtn
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          callback={fetchBook}
        />
        <StoreProvider>
          <BookInfo book={book} ratings={ratings} />
        </StoreProvider>
      </div>
    </div>
  );
};

export default SingleBook;
