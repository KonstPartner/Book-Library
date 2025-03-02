import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import RatingStars from '@/components/ratings/RatingStars';
import HighlightText from '@/components/HighlightText';

const RatingCard = ({
  rating,
  contextType,
  search = {},
}: {
  rating: RatingType;
  contextType: 'book' | 'user';
  search?: Partial<RatingType>;
}) => {
  const { id, bookId, userId, user, book, reviewSummary, reviewScore } =
    getRatingValues(rating);

  const isBook = contextType === 'book';

  return (
    <div className="w-full max-w-3xl mx-auto cursor-pointer">
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 
          p-4 sm:p-6 m-2 sm:m-4 rounded-lg border shadow-md 
          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
          hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
        onClick={() => (window.location.href = `/ratings/${id}`)}
      >
        {isBook && (
          <Link href={`/users/${userId}`} onClick={(e) => e.stopPropagation()}>
            <Image
              src={userAvatar}
              alt={`${user}'s profile`}
              width={50}
              height={50}
              className="rounded-full border border-gray-200 dark:border-gray-600 shrink-0"
            />
          </Link>
        )}
        <div className="flex flex-col w-full gap-2 text-start">
          {isBook ? (
            <Link
              className="w-fit"
              href={`/users/${userId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 hover:underline">
                <HighlightText
                  text={user}
                  searchText={search?.user}
                  highlightClass="bg-yellow-200 dark:bg-yellow-600"
                />
              </h3>
            </Link>
          ) : (
            <Link
              className="w-fit"
              href={`/books/${bookId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bold text-lg text-gray-800 dark:text-gray-200 hover:underline">
                <HighlightText
                  text={book}
                  searchText={search?.book}
                  highlightClass="bg-yellow-200 dark:bg-yellow-600"
                />
              </p>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
              Rating:
            </p>
            <RatingStars rating={Number(reviewScore)} />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-pretty text-sm sm:text-base">
            <HighlightText
              text={reviewSummary}
              searchText={search?.reviewSummary}
              highlightClass="bg-yellow-200 dark:bg-yellow-600"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
