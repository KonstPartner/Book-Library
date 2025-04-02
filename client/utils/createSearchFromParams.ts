import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';

const createSearchFromParams = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>(
  initialSearch: T,
  inputFields: Array<keyof T>,
  searchParams: URLSearchParams
): T => {
  const params = Object.fromEntries(searchParams.entries());
  const exactFields = params.exact ? params.exact.split(',') : [];

  const paramsObject = Object.fromEntries(
    Object.entries(params).filter(
      ([key]) =>
        inputFields.includes(key as keyof T) &&
        key !== 'page' &&
        key !== 'exact' &&
        key !== 'sortBy' &&
        key !== 'sortOrder'
    )
  );

  const searchParamsObject = Object.fromEntries(
    inputFields.map((field) => [
      field,
      {
        field: paramsObject[field as string] || initialSearch[field].field,
        isExact:
          exactFields.includes(field as string) && inputFields.includes(field),
      },
    ])
  );

  return { ...initialSearch, ...searchParamsObject };
};

export default createSearchFromParams;
