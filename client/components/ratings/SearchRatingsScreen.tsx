'use client';

import React, { Suspense } from 'react';
import RatingsIcons from '../RatingsIcons';
import SearchRatingsList from './SearchRatingsList';

const SearchRatingsScreen = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950 backdrop-blur-md overflow-hidden relative px-5">
      <RatingsIcons />
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchRatingsList contextType={contextType} />
      </Suspense>
    </div>
  );
};

export default SearchRatingsScreen;
