import React from 'react';
import RatingType from '@/types/RatingType';
import RatingCard from './RatingCard';

const RatingsList = ({ ratings }: { ratings: RatingType[] }) => {
  return (
    <>
      {!!ratings.length &&
        ratings.map((rating) => <RatingCard key={rating.id} rating={rating} />)}
    </>
  );
};

export default RatingsList;
