'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ALL_BOOKS_URL, ALL_USERS_URL } from '@/constants/apiSources';
import RatingsList from './RatingsList';
import RatingType from '@/types/RatingType';
import { ratingDataFields, ratingsInputFields } from '@/constants/searchFields';
import SearchContainer from '@/components/search/SearchContainer';
import useSearchWithPagination from '@/hooks/useSearchWithPagination';
import defaultFetchData from '@/constants/defaultFetchData';
import { SearchRatingFieldsType } from '@/types/SearchFieldsType';
import { defaultRatingsOrder } from '@/constants/sortOrder';

const SearchRatingsList = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  const isBook = contextType === 'book';
  const params = useParams();
  const { id } = params as { id: string };

  const initialSearch = { ...ratingDataFields };
  const initialSort = { ...defaultRatingsOrder };
  if (isBook) initialSearch.user = { field: '', isExact: false };
  else initialSearch.book = { field: '', isExact: false };

  const baseUrl = `${isBook ? ALL_BOOKS_URL : ALL_USERS_URL}/${id}/ratings`;
  const inputFields = [
    ...ratingsInputFields,
    isBook ? 'user' : 'book',
  ] as Array<keyof SearchRatingFieldsType>;

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
  } = useSearchWithPagination<SearchRatingFieldsType, RatingType>(
    initialSearch,
    initialSort,
    inputFields,
    baseUrl,
    defaultFetchData
  );

  return (
    <SearchContainer
      title="Search Ratings"
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
      sortByOptions={isBook ? ['user', 'reviewScore'] : ['book', 'reviewScore']}
    >
      <>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          For {isBook ? 'book' : 'user'}:
        </p>
        {data.data.length > 0 && (
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:underline">
            {isBook ? (
              <Link href={`/books/${data.data[0].bookId}`}>
                {data.data[0].book}
              </Link>
            ) : (
              <Link href={`/users/${data.data[0].userId}`}>
                {data.data[0].user}
              </Link>
            )}
          </p>
        )}
        <RatingsList
          contextType={contextType}
          ratings={data.data}
          search={search}
        />
      </>
    </SearchContainer>
  );
};

export default SearchRatingsList;
