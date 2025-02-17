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
    return <Spinner className="mx-auto my-16" />;
  }

  if (!rating) {
    return <p>No rating found with id {id}</p>;
  }

  return (
    <>
      <Button
        className="border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-0"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchRating();
        }}
      >
        <RefreshCcw />
      </Button>
      <RatingInfo rating={rating} />;
    </>
  );
};

export default SingleRating;
