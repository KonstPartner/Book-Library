import { useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import updateSearchParams from '@/utils/updateSearchParams';
import createSearchQueryString from '@/utils/createSearchQueryString';
import validateSearch from '@/utils/validateSearch';
import MetadataType from '@/types/MetadataType';

type SearchDataType = Record<string, string | number | null>;
type FetchResponseType<T> = {
  data: T[];
  metadata: MetadataType;
};

const useSearchWithPagination = <T extends SearchDataType, R>(
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
    async (offset: number = 0, searchQuery = search) => {
      setIsLoading(true);
      console.log(search);
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
      const newSearch = {
        ...initialSearch,
        ...Object.fromEntries(
          Object.entries(params).filter(
            ([key]) => key in initialSearch && key !== 'page'
          )
        ),
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
    searchParams,
    defaultData.metadata.perPage,
    initialSearch,
    fetchDataWithOffset,
  ]);

  const handleSearch = useCallback(async () => {
    if (!validateSearch(search)) return;
    const page = 1;
    const offset = (page - 1) * data.metadata.perPage;
    updateSearchParams(
      { ...search, page: page.toString() },
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
      updateSearchParams(
        { ...search, page: page.toString() },
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
