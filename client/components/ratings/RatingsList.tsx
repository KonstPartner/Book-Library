import React from 'react';
import RatingType from '@/types/RatingType';
import RatingCard from './rating/RatingCard';
import { SearchRatingFieldsType } from '@/types/SearchFieldsType';

const RatingsList = ({
  ratings,
  contextType,
  search,
}: {
  ratings: RatingType[];
  contextType: 'book' | 'user';
  search?: SearchRatingFieldsType;
}) => {
  return (
    <div className="sm:w-[80%] mx-auto">
      {!!ratings.length &&
        ratings.map((rating) => (
          <RatingCard
            key={rating.id}
            contextType={contextType}
            rating={rating}
            search={search}
          />
        ))}
    </div>
  );
};

export default RatingsList;
