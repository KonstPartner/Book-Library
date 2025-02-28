'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import Link from 'next/link';
import { ALL_BOOKS_URL, ALL_USERS_URL } from '@/constants/apiSources';
import fetchData from '@/utils/fetchData';
import RatingsList from './RatingsList';
import RatingType from '@/types/RatingType';
import SearchFieldsPreview from '@/components/search/SearchFieldsPreview';
import Button from '@/components/Button';
import SearchInputFields from '@/components/search/SearchInputFields';
import { ratingDataFields, ratingsInputFields } from '@/constants/searchFields';
import validateSearch from '@/utils/validateSearch';
import updateSearchParams from '@/utils/updateSearchParams';
import createSearchQueryString from '@/utils/createSearchQueryString';
import Spinner from '@/components/Spinner';
import PaginationBar from '@/components/PaginationBar';
import { RatingsType } from '@/types/FetchDataTypes';

const SearchRatingsList = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  const isBook = contextType === 'book';

  const initialSearch = { ...ratingDataFields };
  if (isBook) {
    initialSearch.user = '';
  } else {
    initialSearch.book = '';
  }

  const [search, setSearch] = useState<Partial<RatingType>>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState<RatingsType>({
    data: [],
    metadata: { totalItems: 0, totalPages: 0, currentPage: 1, perPage: 10 },
  });
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { id } = params as { id: string };

  const fetchSearchedRatings = useCallback(
    async (offset: number = 0) => {
      setIsLoading(true);
      const query = createSearchQueryString(search, [
        ...ratingsInputFields,
        isBook ? 'user' : 'book',
      ]);
      const url = `${
        isBook ? ALL_BOOKS_URL : ALL_USERS_URL
      }/${id}/ratings?${query}&offset=${offset}`;
      const data = await fetchData(url);
      if (data?.data) {
        setRatings(data.data);
      }
      setIsLoading(false);
    },
    [id, isBook, search]
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * ratings.metadata.perPage;
    fetchSearchedRatings(offset);
  }, [fetchSearchedRatings, searchParams, ratings.metadata.perPage]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev && key !== 'page')
      ),
    }));
  }, [searchParams]);

  const handleButtonClick = useCallback(async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(
      { ...search, page: '1' },
      { searchParams, router, pathname }
    );
    setIsClosedInputs(true);
    fetchSearchedRatings(0);
  }, [fetchSearchedRatings, pathname, router, search, searchParams]);

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * ratings.metadata.perPage;
    updateSearchParams(
      { ...search, page: page.toString() },
      { searchParams, router, pathname }
    );
    fetchSearchedRatings(offset);
  };

  return (
    <div className="flex flex-col text-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
      <h1 className="text-2xl font-bold my-4">Search Ratings</h1>

      <p className="text-lg text-gray-700 dark:text-gray-300">
        For {isBook ? 'book' : 'user'}:
      </p>

      {ratings.data.length > 0 && (
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:underline">
          {isBook ? (
            <Link href={`/books/${ratings.data[0].bookId}`}>
              {ratings.data[0].book}
            </Link>
          ) : (
            <Link href={`/users/${ratings.data[0].userId}`}>
              {ratings.data[0].user}
            </Link>
          )}
        </p>
      )}

      {isClosedInputs ? (
        <>
          <SearchFieldsPreview search={search} />
          <Button
            className="mt-5 mx-auto"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown /> Open fields
          </Button>
        </>
      ) : (
        <>
          <SearchInputFields
            inputFields={[...ratingsInputFields, isBook ? 'user' : 'book']}
            search={search}
            setSearch={(value) => setSearch(value as Partial<RatingType>)}
          />
          <div className="flex flex-col lg:flex-row items-center justify-evenly gap-4 my-4">
            <Button onClick={() => setSearch(initialSearch)}>
              <Eraser /> <span className="ml-1">Clear fields</span>
            </Button>
            <Button onClick={() => setIsClosedInputs(true)}>
              <ChevronUp /> Hide fields
            </Button>
          </div>
        </>
      )}

      <Button
        className="my-10 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Search
      </Button>

      {isLoading ? (
        <Spinner className="mx-auto my-16" />
      ) : ratings.data.length > 0 ? (
        <div className="w-full">
          <RatingsList
            contextType={contextType}
            ratings={ratings.data}
            search={search}
          />
        </div>
      ) : (
        <p className="mt-10 text-gray-500 dark:text-gray-300">
          No ratings found.
        </p>
      )}

      {!isLoading && (
        <div className="my-5 mx-auto">
          <PaginationBar
            metadata={ratings.metadata}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchRatingsList;
