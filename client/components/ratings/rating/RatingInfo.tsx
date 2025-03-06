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
    <>
      <div className="max-w-3xl w-full mx-auto p-6 bg-gradient-to-br from-white/20 to-gray-100/20 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 dark:border-gray-700/40 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)] animate-gradient-x" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between border-b pb-4 border-white/30 dark:border-gray-700/30">
            <div className="flex items-center gap-3 xs:gap-4">
              <Link href={`/users/${userId}`} className="group">
                <div className="relative">
                  <Image
                    src={userAvatar}
                    alt={user as string}
                    className="w-12 h-12 xs:w-14 xs:h-14 rounded-full object-cover border-2 border-white/40 dark:border-gray-700/40 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500 dark:group-hover:border-purple-500 shadow-md"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <Link href={`/users/${userId}`} className="group">
                  <p
                    className="w-fit font-bold text-base xs:text-lg sm:text-xl 
                  text-gray-800 dark:text-gray-200 
                  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
                  relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] 
                  before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 
                  before:scale-x-0 before:origin-center hover:before:scale-x-100 
                  before:transition-transform before:duration-300 before:ease-in-out"
                  >
                    {user}
                  </p>
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
            <h2 className="text-xl xs:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {reviewSummary}
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg bg-white/20 dark:bg-gray-900/20 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/40 dark:border-gray-700/40 transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-900/30">
            {reviewText}
          </p>
        </div>
      </div>
      <DataOptions contextType="rating" id={id as string} />
    </>
  );
};

export default RatingInfo;
