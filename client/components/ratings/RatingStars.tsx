import React from 'react';
import { FaStar, FaRegStarHalfStroke, FaRegStar } from 'react-icons/fa6';

const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} size={25} color="orange" />);
  }

  if (hasHalfStar) {
    stars.push(
      <FaRegStarHalfStroke
        key="half"
        name="star-half-sharp"
        size={25}
        color="orange"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        name="star-outline"
        size={25}
        color="orange"
      />
    );
  }

  return (
    <div className="flex flex-row items-center">
      {stars}
      <div className="text-sm text-gray-400">({rating})</div>
    </div>
  );
};

export default RatingStars;
