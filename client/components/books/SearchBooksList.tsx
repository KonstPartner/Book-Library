'use client';

import React from 'react';
import BookType from '@/types/BookType';
import BooksList from '@/components/books/BooksList';
import { bookDataFields, booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import SearchContainer from '@/components/search/SearchContainer';
import useSearchWithPagination from '@/hooks/useSearchWithPagination';
import BooksIcons from '@/components/BooksIcons';
import defaultFetchData from '@/constants/defaultFetchData';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';

const SearchBooksList = () => {
  const {
    search,
    setSearch,
    isLoading,
    data,
    isClosedInputs,
    setIsClosedInputs,
    handleSearch,
    handlePageChange,
  } = useSearchWithPagination<SearchBookFieldsType, BookType>(
    bookDataFields,
    booksInputFields,
    ALL_BOOKS_URL,
    defaultFetchData
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950 backdrop-blur-md overflow-hidden relative">
      <BooksIcons />

      <SearchContainer
        title="Search Books"
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        data={data}
        isClosedInputs={isClosedInputs}
        setIsClosedInputs={setIsClosedInputs}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        inputFields={booksInputFields as (keyof SearchBookFieldsType)[]}
        initialSearch={bookDataFields}
        containerClassName="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
      >
        <BooksList books={data.data} search={search} />
      </SearchContainer>
    </div>
  );
};

export default SearchBooksList;
