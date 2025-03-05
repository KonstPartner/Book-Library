import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userAvatar } from '@/constants/images';
import RatingType from '@/types/RatingType';
import getRatingValues from '@/utils/getRatingValues';
import RatingStars from '@/components/ratings/RatingStars';
import HighlightText from '@/components/HighlightText';
import { SearchRatingFieldsType } from '@/types/SearchFieldsType';

const RatingCard = ({
  rating,
  contextType,
  search = {},
}: {
  rating: RatingType;
  contextType: 'book' | 'user';
  search?: Partial<SearchRatingFieldsType>;
}) => {
  const router = useRouter();
  const { id, bookId, userId, user, book, reviewSummary, reviewScore } =
    getRatingValues(rating);

  const isBook = contextType === 'book';

  return (
    <div className="w-full max-w-3xl mx-auto my-5">
      <div
        className="flex flex-col sm:flex-row justify-evenly items-center gap-3 xs:gap-4 sm:gap-6 
          p-3 xs:p-4 sm:p-6 m-1 xs:m-2 sm:m-4 rounded-xl border backdrop-blur-sm
          bg-gradient-to-br from-white/30 via-gray-50/30 to-gray-100/30 
          dark:from-gray-900/30 dark:via-gray-800/30 dark:to-gray-700/30 
          border-gray-200/50 dark:border-gray-700
          shadow-md hover:shadow-2xl hover:-translate-y-1 
          hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 
          dark:hover:from-gray-800 dark:hover:via-gray-900 dark:hover:to-gray-800 
          transition-all duration-300 ease-in-out cursor-pointer overflow-hidden 
          relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
          before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 
          before:transition-opacity before:duration-300"
        onClick={() => router.push(`/ratings/${id}`)}
      >
        {isBook && (
          <Link
            className="w-[15%]"
            href={`/users/${userId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group">
              <Image
                src={userAvatar}
                alt={`${user}'s profile`}
                className="rounded-full border-2 border-gray-300/50 dark:border-gray-600/50 
                  shrink-0 object-cover 
                  transition-all duration-300 group-hover:border-blue-500 
                  dark:group-hover:border-purple-500 group-hover:scale-110 
                  group-hover:shadow-lg"
              />

              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent 
                via-white/20 to-transparent opacity-0 group-hover:opacity-100 
                transition-opacity duration-300"
              />
            </div>
          </Link>
        )}

        <div className="flex flex-col w-full gap-2 text-start">
          {isBook ? (
            <Link
              className="w-fit"
              href={`/users/${userId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="font-semibold text-base xs:text-lg sm:text-xl 
                  text-gray-900 dark:text-gray-100 
                  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
                  relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] 
                  before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 
                  before:scale-x-0 before:origin-center hover:before:scale-x-100 
                  before:transition-transform before:duration-300 before:ease-in-out"
              >
                {search?.user?.isExact ? (
                  user
                ) : (
                  <HighlightText
                    text={user}
                    searchText={search?.user?.field}
                    highlightClass="bg-yellow-300 dark:bg-yellow-500"
                  />
                )}
              </h3>
            </Link>
          ) : (
            <Link
              className="w-fit"
              href={`/books/${bookId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                className="font-bold text-base xs:text-lg sm:text-xl 
                  text-gray-800 dark:text-gray-200 
                  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
                  relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] 
                  before:bg-gradient-to-r before:from-blue-600 before:to-purple-600 
                  before:scale-x-0 before:origin-center hover:before:scale-x-100 
                  before:transition-transform before:duration-300 before:ease-in-out"
              >
                {search?.book?.isExact ? (
                  book
                ) : (
                  <HighlightText
                    text={book}
                    searchText={search?.book?.field}
                    highlightClass="bg-yellow-300 dark:bg-yellow-500"
                  />
                )}
              </p>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <p
              className="text-xs xs:text-sm sm:text-base 
                text-gray-600 dark:text-gray-400 shrink-0"
            >
              Rating:
            </p>
            <RatingStars rating={Number(reviewScore)} />
          </div>
          <p
            className="text-gray-700 dark:text-gray-300 text-pretty 
               text-base line-clamp-3"
          >
            {search?.reviewSummary?.isExact ? (
              reviewSummary
            ) : (
              <HighlightText
                text={reviewSummary}
                searchText={search?.reviewSummary?.field}
                highlightClass="bg-yellow-300 dark:bg-yellow-500"
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
