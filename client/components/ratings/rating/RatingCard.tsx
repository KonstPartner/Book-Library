import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import RatingStars from '@/components/ratings/RatingStars';

const RatingCard = ({
  rating,
  contextType,
}: {
  rating: RatingType;
  contextType: 'book' | 'user';
}) => {
  const { id, bookId, userId, user, book, reviewSummary, reviewScore } =
    getRatingValues(rating);

  const isBook = contextType === 'book';

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => (window.location.href = `/ratings/${id}`)}
    >
      <div className="flex items-center gap-4 p-4 border rounded-lg shadow-md my-3 bg-white dark:bg-gray-800 dark:border-transparent hover:bg-gray-50 dark:hover:bg-gray-900">
        {isBook && (
          <Link href={`/user/${userId}`} onClick={(e) => e.stopPropagation()}>
            <Image
              src={userAvatar}
              alt={`${user}'s profile`}
              width={50}
              height={50}
              className="rounded-full border"
            />
          </Link>
        )}
        <div className="flex flex-col text-start">
          {isBook ? (
            <Link
              className="w-fit"
              href={`/users/${userId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-lg hover:underline">{user}</h3>
            </Link>
          ) : (
            <Link
              className="w-fit"
              href={`/books/${bookId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bold text-gray-800 dark:text-gray-300 hover:underline">
                {book}
              </p>
            </Link>
          )}
          <div className="flex items-center">
            <p className="text-gray-500 text-sm">Rating:</p>
            <RatingStars rating={Number(reviewScore)} />
          </div>
          <p className="mt-2 text-pretty text-gray-700 dark:text-gray-300">
            {reviewSummary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
