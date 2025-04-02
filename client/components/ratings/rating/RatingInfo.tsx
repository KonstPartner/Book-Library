import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import RatingStars from '@/components/ratings/RatingStars';
import DataOptions from '@/components/dataOptions/DataOptions';
import useAuth from '@/hooks/useAuth';

const RatingInfo = ({ rating }: { rating: RatingType }) => {
  const { user } = useAuth();
  const {
    id,
    bookId,
    userId,
    book,
    user: useName,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  } = getRatingValues(rating);

  return (
    <>
      <div className="max-w-3xl w-full mx-auto p-6 gradient-blur-container">
        <span className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)] animate-gradient-x" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between border-b pb-4 border-white/30 dark:border-gray-700/30">
            <div className="flex items-center gap-3 xs:gap-4">
              <Link href={`/users/${userId}`} className="group">
                <div className="relative">
                  <Image
                    src={userAvatar}
                    alt={useName as string}
                    className="w-12 h-12 xs:w-14 xs:h-14 rating-avatar transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <Link href={`/users/${userId}`} className="group">
                  <p className="w-fit gradient-link-text">{useName}</p>
                </Link>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
                    Rating:
                  </p>
                  <RatingStars rating={Number(reviewScore)} />
                </div>
              </div>
            </div>
            <p className="text-sm xs:text-md text-gray-500 dark:text-gray-400 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border border-white/30 dark:border-gray-700/30">
              Helpfulness: {reviewHelpfulness}
            </p>
          </div>

          <Link href={`/books/${bookId}`} className="group w-fit mr-0 ml-auto">
            <p className="my-2 text-right text-gray-500 dark:text-gray-400 text-sm xs:text-base relative hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
              Book: {book}
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </p>
          </Link>

          <div className="relative">
            <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold gradient-title">
              {reviewSummary}
            </h2>
          </div>

          <p className="rating-text-block">{reviewText}</p>
        </div>
      </div>
      {user && user.id === userId && (
        <DataOptions contextType="rating" id={id as string} />
      )}
    </>
  );
};

export default RatingInfo;
