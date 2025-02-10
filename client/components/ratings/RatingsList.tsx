import React from 'react';
import RatingType from '@/types/RatingType';
import RatingCard from './rating/RatingCard';

const RatingsList = ({
  ratings,
  contextType,
}: {
  ratings: RatingType[];
  contextType: 'book' | 'user';
}) => {
  return (
    <>
      {!!ratings.length &&
        ratings.map((rating) => <RatingCard key={rating.id} contextType={contextType} rating={rating} />)}
    </>
  );
};

export default RatingsList;
