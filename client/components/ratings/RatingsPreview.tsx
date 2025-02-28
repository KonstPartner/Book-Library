import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RatingsList from '@/components/ratings/RatingsList';
import fetchData from '@/utils/fetchData';
import { ALL_BOOKS_URL, ALL_USERS_URL } from '@/constants/apiSources';
import Spinner from '../Spinner';

const RatingsPreview = ({
  id,
  ratingsCount,
  contextType,
}: {
  id: number | string;
  ratingsCount: number;
  contextType: 'book' | 'user';
}) => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isBook = contextType === 'book';

  useEffect(() => {
    const fetchRatings = async () => {
      const data = await fetchData(
        `${isBook ? ALL_BOOKS_URL : ALL_USERS_URL}/${id}/ratings`
      );

      if (data?.data?.data) {
        setRatings(data.data.data);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchRatings();
  }, [id, isBook]);

  return (
    <div className="bg-gray-100 dark:bg-gray-700 md:p-3 rounded-lg">
      <div className="flex justify-between">
        <p>Reviews ({ratingsCount})</p>
        {ratingsCount && ratingsCount > 5 && (
          <Link href={`/${isBook ? 'books' : 'users'}/${id}/ratings`}>
            <p className="text-blue-600 text-lg text-center w-fit m-auto p-1 rounded-md dark:text-gray-200 dark:bg-blue-500 hover:underline">
              Show All
            </p>
          </Link>
        )}
      </div>
      {isLoading ? (
        <Spinner className="mx-auto my-16" />
      ) : (
        <RatingsList contextType={contextType} ratings={ratings} />
      )}
    </div>
  );
};

export default RatingsPreview;
