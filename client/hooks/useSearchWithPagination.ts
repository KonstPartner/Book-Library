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
} from '@/types/SearchFieldsType';
import getSearchQueries from '@/utils/getSearchQueries';

type FetchResponseType<T> = {
  data: T[];
  metadata: MetadataType;
};

const useSearchWithPagination = <
  T extends SearchBookFieldsType | SearchRatingFieldsType,
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

  const { searchFields } = getSearchQueries(initialSearch);

  const fetchDataWithOffset = useCallback(
    async (offset: number = 0, searchQuery = search) => {
      setIsLoading(true);
      const query = createSearchQueryString(searchQuery, inputFields as any);
      const url = `${baseUrl}?${query}&offset=${offset}`;
      const response = await fetchData(url);
      if (response?.data) {
        setData(response.data);
      }
      setIsLoading(false);
    },
    [search, baseUrl, inputFields]
  );

  useEffect(() => {
    if (isFirstLoad.current) {
      const params = Object.fromEntries(searchParams.entries());

      const paramsObject = Object.fromEntries(
        Object.entries(params).filter(
          ([key]) => key in searchFields && key !== 'page' && key !== 'exact'
        )
      );

      const searchParamsObject = Object.fromEntries(
        Object.entries(paramsObject).map(([key, value]) => [
          key,
          {
            field: value,
            isExact: params?.exact?.split(',').some((el) => el === key)
              ? true
              : false,
          },
        ])
      );

      const newSearch = {
        ...initialSearch,
        ...searchParamsObject,
      };

      setSearch(newSearch);
      const page = parseInt(searchParams.get('page') || '1', 10);
      const offset = (page - 1) * defaultData.metadata.perPage;
      setData((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, currentPage: page },
      }));
      fetchDataWithOffset(offset, newSearch);

      isFirstLoad.current = false;
    }
  }, [
    searchFields,
    searchParams,
    defaultData.metadata.perPage,
    initialSearch,
    fetchDataWithOffset,
  ]);

  const handleSearch = useCallback(async () => {
    if (!validateSearch(search)) return;
    const page = 1;
    const offset = (page - 1) * data.metadata.perPage;
    const { searchFields, searchExactFields } = getSearchQueries(search);
    updateSearchParams(
      { ...searchFields, exact: searchExactFields, page: page.toString() },
      { searchParams, router, pathname }
    );
    setIsClosedInputs(true);
    await fetchDataWithOffset(offset);
  }, [
    fetchDataWithOffset,
    pathname,
    router,
    search,
    searchParams,
    data.metadata.perPage,
  ]);

  const handlePageChange = useCallback(
    (page: number) => {
      const offset = (page - 1) * data.metadata.perPage;
      const { searchFields, searchExactFields } = getSearchQueries(search);
      updateSearchParams(
        { ...searchFields, exact: searchExactFields, page: page.toString() },
        { searchParams, router, pathname }
      );
      fetchDataWithOffset(offset);
    },
    [
      fetchDataWithOffset,
      pathname,
      router,
      search,
      searchParams,
      data.metadata.perPage,
    ]
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
