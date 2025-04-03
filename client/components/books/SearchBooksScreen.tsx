import React, { Suspense } from 'react';
import BooksIcons from '../BooksIcons';
import SearchBooksList from './SearchBooksList';

const SearchBooksScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950 backdrop-blur-md overflow-hidden relative px-5">
      <BooksIcons />
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchBooksList />
      </Suspense>
    </div>
  );
};

export default SearchBooksScreen;
