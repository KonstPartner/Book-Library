import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const updateSearchParams = (
  newParams: Partial<Partial<BookType> | Partial<RatingType>> & {
    page?: string;
    exact?: string;
  },
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
    if (value?.toString().trim()) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
  });

  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};

export default updateSearchParams;
