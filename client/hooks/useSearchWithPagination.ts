'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
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
import { SortOptionsType, SortOrderType } from '@/types/SortOptionsType';

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
  initialSort: SortOptionsType,
  inputFields: Array<keyof T>,
  baseUrl: string,
  defaultData: FetchResponseType<R>
) => {
  const [search, setSearch] = useState<T>(initialSearch);
  const [sortOptions, setSortOptions] = useState<SortOptionsType>({
    sortBy: 'title',
    sortOrder: 'ASC',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FetchResponseType<R>>(defaultData);
  const [isClosedInputs, setIsClosedInputs] = useState(false);
  const isFirstLoad = useRef(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchDataWithOffset = useCallback(
    async (
      offset: number = 0,
      searchQuery: T = search,
      sortQuery: SortOptionsType = sortOptions
    ) => {
      setIsLoading(true);
      try {
        const query = createSearchQueryString(
          searchQuery,
          sortQuery,
          inputFields
        );
        const url = `${baseUrl}?${query}&offset=${offset}`;
        const response = await fetchData(url);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error fetching data');
      } finally {
        setIsLoading(false);
      }
    },
    [search, baseUrl, inputFields, sortOptions]
  );

  const updateUrlAndFetch = useCallback(
    (
      page: number,
      searchQuery: T,
      sortQuery: SortOptionsType = sortOptions
    ) => {
      const offset = (page - 1) * data.metadata.perPage;
      const { searchFields, searchExactFields } = getSearchQueries(searchQuery);
      updateSearchParams(
        {
          ...searchFields,
          exact: searchExactFields,
          page: page.toString(),
          ...(sortQuery.sortBy && { sortBy: sortQuery.sortBy }),
          ...(sortQuery.sortOrder && { sortOrder: sortQuery.sortOrder }),
        },
        { searchParams, router, pathname }
      );
      fetchDataWithOffset(offset, searchQuery, sortQuery);
    },
    [
      fetchDataWithOffset,
      data.metadata.perPage,
      searchParams,
      router,
      pathname,
      sortOptions,
    ]
  );

  useEffect(() => {
    if (!isFirstLoad.current) return;

    const newSearch = createSearchFromParams(
      initialSearch,
      inputFields,
      searchParams
    );
    setSearch(newSearch);

    const sortBy = searchParams.get('sortBy') || initialSort.sortBy;

    let sortOrder = searchParams.get('sortOrder') as SortOrderType;

    if (!sortOrder) {
      sortOrder = sortBy === 'reviewScore' ? 'DESC' : initialSort.sortOrder;
    }

    setSortOptions({ sortBy, sortOrder });

    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * defaultData.metadata.perPage;
    setData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, currentPage: page },
    }));
    fetchDataWithOffset(offset, newSearch, { sortBy, sortOrder });

    isFirstLoad.current = false;
  }, [
    searchParams,
    initialSearch,
    initialSort,
    inputFields,
    defaultData.metadata.perPage,
    fetchDataWithOffset,
  ]);

  const handleSearch = useCallback(async () => {
    if (!validateSearch(search)) return;
    setIsClosedInputs(true);
    updateUrlAndFetch(1, search, sortOptions);
  }, [search, sortOptions, updateUrlAndFetch]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlAndFetch(page, search, sortOptions);
    },
    [search, sortOptions, updateUrlAndFetch]
  );

  return {
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
    fetchDataWithOffset,
  };
};

export default useSearchWithPagination;
