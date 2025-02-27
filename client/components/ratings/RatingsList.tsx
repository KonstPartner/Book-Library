import React from 'react';
import RatingType from '@/types/RatingType';
import RatingCard from './rating/RatingCard';

const RatingsList = ({
  ratings,
  contextType,
  search,
}: {
  ratings: RatingType[];
  contextType: 'book' | 'user';
  search?: Partial<RatingType>;
}) => {
  return (
    <>
      {!!ratings.length &&
        ratings.map((rating) => (
          <RatingCard
            key={rating.id}
            contextType={contextType}
            rating={rating}
            search={search}
          />
        ))}
    </>
  );
};

export default RatingsList;
