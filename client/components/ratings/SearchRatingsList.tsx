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
import RatingsIcons from '../RatingsIcons';

const SearchRatingsList = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  const isBook = contextType === 'book';
  const params = useParams();
  const { id } = params as { id: string };

  const initialSearch = { ...ratingDataFields };
  if (isBook) initialSearch.user = { field: '', isExact: false };
  else initialSearch.book = { field: '', isExact: false };

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
  } = useSearchWithPagination<SearchRatingFieldsType, RatingType>(
    initialSearch,
    inputFields,
    baseUrl,
    defaultFetchData
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950 backdrop-blur-md overflow-hidden relative">
      <RatingsIcons />
      <SearchContainer
        title="Search Ratings"
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        data={data}
        isClosedInputs={isClosedInputs}
        setIsClosedInputs={setIsClosedInputs}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        inputFields={inputFields as (keyof SearchRatingFieldsType)[]}
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
    </div>
  );
};

export default SearchRatingsList;
