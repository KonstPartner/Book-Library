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

const SearchRatingsList = ({
  contextType,
}: {
  contextType: 'book' | 'user';
}) => {
  const isBook = contextType === 'book';

  const initialSearch = {...ratingDataFields};

  if (isBook) {
    initialSearch.user = '';
  } else {
    initialSearch.book = '';
  }
  const [search, setSearch] = useState<Partial<RatingType>>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState<RatingType[] | []>([]);
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();
  const { id } = params as { id: string };

  const fetchSearchedRatings = useCallback(async (url: string) => {
    setIsLoading(true);
    const data = await fetchData(url);
    if (data?.data) {
      setRatings(data.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSearchedRatings(
      `${isBook ? ALL_BOOKS_URL : ALL_USERS_URL}/${id}/ratings`
    );
  }, [id, isBook, fetchSearchedRatings]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev)
      ),
    }));
  }, [searchParams]);

  const handleButtonClick = useCallback(async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(search, { searchParams, router, pathname });
    setIsClosedInputs(true);
    const query = createSearchQueryString(search, [
      ...ratingsInputFields,
      isBook ? 'user' : 'book',
    ]);
    fetchSearchedRatings(
      `${isBook ? ALL_BOOKS_URL : ALL_USERS_URL}/${id}/ratings?${query}`
    );
  }, [
    id,
    isBook,
    pathname,
    router,
    search,
    searchParams,
    fetchSearchedRatings,
  ]);

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-2xl font-bold text-center my-4 w-full">
        Search Ratings
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        For {isBook ? 'book' : 'user'}:
      </p>
      {!!ratings.length && (
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:underline">
          {isBook ? (
            <Link href={`/books/${ratings[0].bookId}`}>{ratings[0].book}</Link>
          ) : (
            <Link href={`/users/${ratings[0].userId}`}>{ratings[0].user}</Link>
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
          <div className="flex flex-row-reverse justify-evenly my-4">
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
      ) : ratings.length ? (
        <RatingsList contextType={contextType} ratings={ratings} />
      ) : (
        <p className="mt-10">No ratings found.</p>
      )}
    </div>
  );
};

export default SearchRatingsList;
