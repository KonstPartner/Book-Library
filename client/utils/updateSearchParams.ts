import { SearchBooksFieldsType, SearchRatingsFieldsType } from '@/types/SearchFields';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

const updateSearchParams = (
  newParams: Partial<SearchBooksFieldsType | SearchRatingsFieldsType>,
  {
    searchParams,
    router,
    pathname,
  }: {
    searchParams: ReadonlyURLSearchParams;
    router: AppRouterInstance;
    pathname: string;
  }
) => {
  const params = new URLSearchParams(searchParams);

  Object.entries(newParams).forEach(([key, value]) => {
    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};

export default updateSearchParams;
