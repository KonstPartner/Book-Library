'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import RatingInfo from '@/components/ratings/rating/RatingInfo';
import Spinner from '@/components/Spinner';
import { ALL_RATINGS_URL } from '@/constants/apiSources';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import RefreshBtn from '@/components/RefreshBtn';

const SingleRating = ({
  initialRating,
  fetchError,
}: {
  initialRating: RatingType | null;
  fetchError: string | null;
}) => {
  const params = useParams();
  const { id } = params as { id: string };
  const [rating, setRating] = useState<RatingType | null>(initialRating);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const fetchRating = useCallback(async () => {
    fetchDataWrapper(async () => {
      const data = await fetchData(`${ALL_RATINGS_URL}/${id}`);
      if (data?.data) {
        setRating(data.data);
        toast.success('Rating refreshed successfully');
      }
    }, setIsLoading);
  }, [id]);

  if (isLoading) {
    return (
      <div className="gradient-page-bg">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!rating) {
    return (
      <div className="gradient-page-bg">
        <p>{fetchError || `No rating found with id ${id}`}</p>
      </div>
    );
  }

  return (
    <div className="gradient-page-bg">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RefreshBtn
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          callback={fetchRating}
        />
        <StoreProvider>
          <RatingInfo rating={rating} />
        </StoreProvider>
      </div>
    </div>
  );
};

export default SingleRating;
