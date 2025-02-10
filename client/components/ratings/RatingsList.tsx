import RatingType from '@/types/RatingType';
import React from 'react';
import RatingCard from './RatingCard';

const RatingInfo = ({ ratings }: { ratings: RatingType[] }) => {
  return (
    <div>
      {ratings.map((rating) => (
        <RatingCard key={rating.id} rating={rating} />
      ))}
    </div>
  );
};

export default RatingInfo;
