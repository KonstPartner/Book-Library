'use client';

import RatingInfo from '@/components/ratings/rating/RatingInfo';
import Spinner from '@/components/Spinner';
import { ALL_RATINGS_URL } from '@/constants/apiSources';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleRating = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [rating, setRating] = useState<RatingType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      const data = await fetchData(`${ALL_RATINGS_URL}/${id}`);
      if (data?.data) setRating(data.data);
      setIsLoading(false);
    };

    if (id) {
      fetchRating();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner className='mx-auto my-16'/>;
  }

  if (!rating) {
    return <p>No rating found with id {id}</p>;
  }

  return <RatingInfo rating={rating} />;
};

export default SingleRating;
