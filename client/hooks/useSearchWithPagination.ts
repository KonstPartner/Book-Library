import { useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import updateSearchParams from '@/utils/updateSearchParams';
import createSearchQueryString from '@/utils/createSearchQueryString';
import validateSearch from '@/utils/validateSearch';
import MetadataType from '@/types/MetadataType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getSearchQueries from '@/utils/getSearchQueries';
import createSearchFromParams from '@/utils/createSearchFromParams';

type FetchResponseType<T> = {
  data: T[];
  metadata: MetadataType;
};

const useSearchWithPagination = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType),
  R
>(
  initialSearch: T,
  inputFields: string[],
  baseUrl: string,
  defaultData: FetchResponseType<R>
) => {
  const [search, setSearch] = useState<T>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FetchResponseType<R>>(defaultData);
  const [isClosedInputs, setIsClosedInputs] = useState(false);
  const isFirstLoad = useRef(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchDataWithOffset = useCallback(
    async (offset: number = 0, searchQuery: T = search) => {
      setIsLoading(true);
      try {
        const query = createSearchQueryString(
          searchQuery,
          inputFields as (
            | keyof SearchBookFieldsType
            | keyof SearchRatingFieldsType
          )[]
        );
        const url = `${baseUrl}?${query}&offset=${offset}`;
        const response = await fetchData(url);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [search, baseUrl, inputFields]
  );

  const updateUrlAndFetch = useCallback(
    (page: number, searchQuery: T) => {
      const offset = (page - 1) * data.metadata.perPage;
      const { searchFields, searchExactFields } = getSearchQueries(searchQuery);
      updateSearchParams(
        { ...searchFields, exact: searchExactFields, page: page.toString() },
        { searchParams, router, pathname }
      );
      fetchDataWithOffset(offset, searchQuery);
    },
    [fetchDataWithOffset, data.metadata.perPage, searchParams, router, pathname]
  );

  useEffect(() => {
    if (!isFirstLoad.current) return;

    const newSearch = createSearchFromParams(
      initialSearch,
      inputFields,
      searchParams
    );
    setSearch(newSearch);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * defaultData.metadata.perPage;
    setData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, currentPage: page },
    }));
    fetchDataWithOffset(offset, newSearch);

    isFirstLoad.current = false;
  }, [
    searchParams,
    initialSearch,
    inputFields,
    defaultData.metadata.perPage,
    fetchDataWithOffset,
  ]);

  const handleSearch = useCallback(async () => {
    if (!validateSearch(search)) return;
    setIsClosedInputs(true);
    updateUrlAndFetch(1, search);
  }, [search, updateUrlAndFetch]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlAndFetch(page, search);
    },
    [search, updateUrlAndFetch]
  );

  return {
    search,
    setSearch,
    isLoading,
    data,
    isClosedInputs,
    setIsClosedInputs,
    handleSearch,
    handlePageChange,
    fetchDataWithOffset,
  };
};

export default useSearchWithPagination;
