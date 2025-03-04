import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

interface SearchFieldsResult {
  searchFields: Record<string, string>;
  searchExactFields: string;
}

const getSearchQueries = (
  search: SearchBookFieldsType | SearchRatingFieldsType
): SearchFieldsResult => {
  const searchFields = Object.fromEntries(
    Object.entries(search).map(([key, { field }]) => [key, field])
  );

  const exactFieldsArray = Object.entries(search)
    .filter(([, { isExact }]) => isExact)
    .map(([key]) => key);

  return {
    searchFields,
    searchExactFields: exactFieldsArray.join(','),
  };
};

export default getSearchQueries;
