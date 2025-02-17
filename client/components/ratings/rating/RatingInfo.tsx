import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import RatingStars from '@/components/ratings/RatingStars';
import DataOptions from '@/components/dataOptions/DataOptions';

const RatingInfo = ({ rating }: { rating: RatingType }) => {
  const {
    id,
    bookId,
    userId,
    book,
    user,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  } = getRatingValues(rating);

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg dark:bg-zinc-800 bg-white">
        <div className="flex items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Link href={`/users/${userId}`}>
              <Image
                src={userAvatar}
                alt={user as string}
                className="w-12 h-12 rounded-full object-cover border border-gray-400"
              />
            </Link>
            <div>
              <Link className="hover:underline" href={`/users/${userId}`}>
                <p className="text-gray-800 dark:text-gray-100 font-medium text-lg">
                  {user}
                </p>
              </Link>
              <div className="flex">
                <p className="text-gray-500">Rating:</p>
                <RatingStars rating={Number(reviewScore)} />
              </div>
            </div>
          </div>
          <p className="text-md text-gray-500 dark:text-gray-400">
            Helpfulness: {reviewHelpfulness}
          </p>
        </div>
        <Link className="hover:underline" href={`/books/${bookId}`}>
          <p className="my-2 text-right text-gray-500">Book: {book}</p>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {reviewSummary}
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          {reviewText}
        </p>
      </div>
      <DataOptions contextType="rating" id={id as string} />
    </div>
  );
};

export default RatingInfo;
