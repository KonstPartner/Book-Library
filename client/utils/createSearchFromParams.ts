import { SearchBookFieldsType, SearchRatingFieldsType, SearchFieldType } from '@/types/SearchFieldsType';

const createSearchFromParams = <
  T extends Record<keyof T, SearchFieldType> & (SearchBookFieldsType | SearchRatingFieldsType)
>(
  initialSearch: T,
  inputFields: string[],
  searchParams: URLSearchParams
): T => {
  const params = Object.fromEntries(searchParams.entries());
  const exactFields = params.exact ? params.exact.split(',') : [];
  const paramsObject = Object.fromEntries(
    Object.entries(params).filter(
      ([key]) => inputFields.includes(key) && key !== 'page' && key !== 'exact'
    )
  );

  const searchParamsObject = Object.fromEntries(
    inputFields.map((field) => [
      field,
      {
        field: paramsObject[field] || initialSearch[field as keyof T].field,
        isExact: exactFields.includes(field) && inputFields.includes(field),
      },
    ])
  );

  return { ...initialSearch, ...searchParamsObject };
};

export default createSearchFromParams;