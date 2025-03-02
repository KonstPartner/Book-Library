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
import { RatingsType } from '@/types/FetchDataTypes';
import defaultFetchData from '@/constants/defaultFetchData';

const SearchRatingsList = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  const isBook = contextType === 'book';
  const params = useParams();
  const { id } = params as { id: string };

  const initialSearch = { ...ratingDataFields };
  if (isBook) initialSearch.user = '';
  else initialSearch.book = '';

  const baseUrl = `${isBook ? ALL_BOOKS_URL : ALL_USERS_URL}/${id}/ratings`;
  const inputFields = [...ratingsInputFields, isBook ? 'user' : 'book'];

  const {
    search,
    setSearch,
    isLoading,
    data,
    isClosedInputs,
    setIsClosedInputs,
    handleSearch,
    handlePageChange,
  } = useSearchWithPagination<Partial<RatingType>, RatingType>(
    initialSearch,
    inputFields,
    baseUrl,
    defaultFetchData
  );

  return (
    <SearchContainer
      title="Search Ratings"
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      data={data as RatingsType}
      isClosedInputs={isClosedInputs}
      setIsClosedInputs={setIsClosedInputs}
      handleSearch={handleSearch}
      handlePageChange={handlePageChange}
      inputFields={inputFields}
      initialSearch={initialSearch}
      containerClassName="flex flex-col text-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto"
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
