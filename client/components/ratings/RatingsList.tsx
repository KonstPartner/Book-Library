import RatingType from '@/types/RatingType';
import React from 'react';
import RatingCard from './RatingCard';

const RatingInfo = ({ ratings }: { ratings: RatingType[] }) => {
  return (
    <>
      {!!ratings.length &&
        ratings.map((rating) => <RatingCard key={rating.id} rating={rating} />)}
    </>
  );
};

export default RatingInfo;
