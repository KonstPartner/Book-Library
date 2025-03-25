import React from 'react';
import SingleRating from '@/components/ratings/rating/SingleRating';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';
import { ALL_RATINGS_URL } from '@/constants/apiSources';

const RatingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let rating: RatingType | null = null;
  let error: string | null = null;

  try {
    const response = await fetchData(`${ALL_RATINGS_URL}/${id}`);
    rating = response?.data || null;

    if (!rating) {
      error = `No rating found with id ${id}`;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch rating';
  }
  return <SingleRating initialRating={rating} fetchError={error} />;
};

export default RatingPage;
