'use client';

import { ALL_BOOKS_URL } from '@/constants/apiSources';
import fetchData from '@/utils/fetchData';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RatingsList from './RatingsList';
import RatingType from '@/types/RatingType';
import { SearchRatingsFieldsType } from '@/types/SearchFields';
import SearchFieldsPreview from '../search/SearchFieldsPreview';
import Button from '../Button';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import SearchInputFields from '../search/SearchInputFields';
import { ratingsInputFields } from '@/constants/searchFields';
import validateSearch from '@/utils/validateSearch';
import updateSearchParams from '@/utils/updateSearchParams';
import createSearchQueryString from '@/utils/createSearchQueryString';

const initialSearch = {
  reviewHelpfulness: '',
  reviewScore: '',
  reviewSummary: '',
  reviewText: '',
  user: '',
};

const SearchRatingsList = () => {
  const [search, setSearch] = useState<SearchRatingsFieldsType>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState<RatingType[] | []>([]);
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();
  const { id } = params as { id: string };
  
  useEffect(() => {
    fetchSearchedRatings(`${ALL_BOOKS_URL}/${id}/ratings`);
  }, [id]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev)
      ),
    }));
  }, [searchParams]);

  const fetchSearchedRatings = async (url: string) => {
    setIsLoading(true);
    const data = await fetchData(url);
    if (data?.data) {
      setRatings(data.data);
    }
    setIsLoading(false);
  };

  const handleButtonClick = async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(search, { searchParams, router, pathname });
    setIsClosedInputs(true);
    const query = createSearchQueryString(search, ratingsInputFields);
    fetchSearchedRatings(`${ALL_BOOKS_URL}/${id}/ratings?${query}`);
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-2xl font-bold text-center my-4 w-full">
        Search Ratings
      </h1>
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
            inputFields={ratingsInputFields}
            search={search}
            setSearch={(value) => setSearch(value as SearchRatingsFieldsType)}
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
        className="mt-10 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Search
      </Button>
      {!isLoading &&
        (ratings.length ? (
          <RatingsList ratings={ratings} />
        ) : (
          <p className="mt-10">No ratings found.</p>
        ))}
    </div>
  );
};

export default SearchRatingsList;
