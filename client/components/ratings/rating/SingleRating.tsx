'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';
import Button from '@/components/Button';
import RatingInfo from '@/components/ratings/rating/RatingInfo';
import Spinner from '@/components/Spinner';
import { ALL_RATINGS_URL } from '@/constants/apiSources';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';

const SingleRating = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [rating, setRating] = useState<RatingType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRating = useCallback(async () => {
    const data = await fetchData(`${ALL_RATINGS_URL}/${id}`);
    if (data?.data) setRating(data.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchRating();
    }
  }, [id, fetchRating]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!rating) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
        <p>No rating found with id {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
      <Button
        className="border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-1"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchRating();
        }}
      >
        <RefreshCcw />
      </Button>
      <RatingInfo rating={rating} />
    </div>
  );
};

export default SingleRating;
