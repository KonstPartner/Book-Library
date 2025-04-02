'use client';

import React from 'react';
import Link from 'next/link';
import RatingsList from '@/components/ratings/RatingsList';
import RatingType from '@/types/RatingType';

const RatingsPreview = ({
  id,
  ratingsCount,
  contextType,
  ratings,
}: {
  id: number | string;
  ratingsCount: number;
  contextType: 'book' | 'user';
  ratings: RatingType[];
}) => {
  const isBook = contextType === 'book';

  return (
    <div className="preview-container xs:p-6 md:p-8">
      <span className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)] animate-gradient-x" />

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg xs:text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Reviews ({ratingsCount})
        </p>
        {ratingsCount && ratingsCount > 5 && (
          <Link href={`/${isBook ? 'books' : 'users'}/${id}/ratings`}>
            <p className="show-all-button xs:text-base md:text-lg">
              Show All
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-shine" />
            </p>
          </Link>
        )}
      </div>

      {!ratings.length ? (
        <p>No reviews found</p>
      ) : (
        <RatingsList contextType={contextType} ratings={ratings} />
      )}
    </div>
  );
};

export default RatingsPreview;
