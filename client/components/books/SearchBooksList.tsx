'use client';

import React from 'react';
import BookType from '@/types/BookType';
import BooksList from '@/components/books/BooksList';
import { bookDataFields, booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import { SearchContainer } from '@/components/search/SearchContainer';
import useSearchWithPagination from '@/hooks/useSearchWithPagination';
import { BooksType } from '@/types/FetchDataTypes';

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
  } = useSearchWithPagination<Partial<BookType>, BookType>(
    bookDataFields,
    booksInputFields,
    ALL_BOOKS_URL,
    {
      data: [],
      metadata: { totalItems: 0, totalPages: 0, currentPage: 1, perPage: 10 },
    }
  );

  return (
    <SearchContainer
      title="Search Books"
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      data={data as BooksType}
      isClosedInputs={isClosedInputs}
      setIsClosedInputs={setIsClosedInputs}
      handleSearch={handleSearch}
      handlePageChange={handlePageChange}
      inputFields={booksInputFields}
      initialSearch={bookDataFields}
      containerClassName="flex flex-col items-center text-center w-full max-w-3xl mx-auto px-4 sm:px-6"
    >
      <BooksList books={data.data} search={search} />
    </SearchContainer>
  );
};

export default SearchBooksList;
