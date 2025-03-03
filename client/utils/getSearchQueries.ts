import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const getSearchQueries = (
  search: SearchBookFieldsType | SearchRatingFieldsType
) => {
  const searchFields = Object.fromEntries(
    Object.entries(search).map(([key, { field }]) => [key, field])
  );

  const searchExactFields: string[] = [];

  Object.entries(search).forEach(([key, { isExact }]) => {
    if (isExact) searchExactFields.push(key);
  });

  return { searchFields, searchExactFields };
};

export default getSearchQueries;
