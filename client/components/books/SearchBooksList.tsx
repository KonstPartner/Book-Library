'use client';

import React from 'react';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BooksList from './BooksList';
import BookType from '@/types/BookType';
import { bookDataFields, booksInputFields } from '@/constants/searchFields';
import SearchContainer from '@/components/search/SearchContainer';
import useSearchWithPagination from '@/hooks/useSearchWithPagination';
import defaultFetchData from '@/constants/defaultFetchData';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';
import { defaultBooksOrder } from '@/constants/sortOrder';

const SearchBooksList = () => {
  const initialSearch = { ...bookDataFields };
  const initialSort = { ...defaultBooksOrder };
  const inputFields = booksInputFields as Array<keyof SearchBookFieldsType>;
  const baseUrl = ALL_BOOKS_URL;

  const {
    search,
    setSearch,
    sortOptions,
    setSortOptions,
    isLoading,
    data,
    isClosedInputs,
    setIsClosedInputs,
    handleSearch,
    handlePageChange,
  } = useSearchWithPagination<SearchBookFieldsType, BookType>(
    initialSearch,
    initialSort,
    inputFields,
    baseUrl,
    defaultFetchData
  );

  return (
    <SearchContainer
      title="Search Books"
      search={search}
      setSearch={setSearch}
      sortOptions={sortOptions}
      setSortOptions={setSortOptions}
      isLoading={isLoading}
      data={data}
      isClosedInputs={isClosedInputs}
      setIsClosedInputs={setIsClosedInputs}
      handleSearch={handleSearch}
      handlePageChange={handlePageChange}
      inputFields={inputFields}
      initialSearch={initialSearch}
      containerClassName="flex flex-col text-center w-full mx-auto"
      sortByOptions={['title', 'publishedDate']}
    >
      <BooksList books={data.data} search={search} />
    </SearchContainer>
  );
};

export default SearchBooksList;
