import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import Image from 'next/image';
import React from 'react';
import RatingStars from './RatingStars';

const RatingCard = ({ rating }: { rating: RatingType }) => {
  const { user, reviewSummary, reviewScore } = getRatingValues(rating);

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-md my-3 bg-white dark:bg-gray-700 dark:border-transparent">
      <Image
        src={userAvatar}
        alt={`${user}'s profile`}
        width={50}
        height={50}
        className="rounded-full border"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">{user}</h3>
        <div className="flex items-center">
          <p className="text-gray-500 text-sm">Rating:</p>
          <RatingStars rating={Number(reviewScore)} />
        </div>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{reviewSummary}</p>
      </div>
    </div>
  );
};

export default RatingCard;
