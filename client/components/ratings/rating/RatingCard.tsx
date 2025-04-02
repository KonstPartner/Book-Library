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
        className="rating-card sm:flex-row xs:p-4 sm:p-6 xs:m-2 sm:m-4 xs:gap-4 sm:gap-6 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
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
                className="rating-avatar"
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <h3 className="gradient-link-text xs:text-lg sm:text-xl">
                {search?.user?.isExact ? (
                  user
                ) : (
                  <HighlightText
                    text={user}
                    searchText={search?.user?.field}
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
              <p className="gradient-link-text xs:text-lg sm:text-xl">
                {search?.book?.isExact ? (
                  book
                ) : (
                  <HighlightText
                    text={book}
                    searchText={search?.book?.field}
                  />
                )}
              </p>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400 shrink-0">
              Rating:
            </p>
            <RatingStars rating={Number(reviewScore)} />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-pretty text-base line-clamp-3">
            {search?.reviewSummary?.isExact ? (
              reviewSummary
            ) : (
              <HighlightText
                text={reviewSummary}
                searchText={search?.reviewSummary?.field}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
