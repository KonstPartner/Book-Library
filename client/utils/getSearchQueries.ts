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

  const exactFieldsArray: string[] = [];

  Object.entries(search).forEach(([key, { isExact }]) => {
    if (isExact) exactFieldsArray.push(key);
  });

  return { searchFields, searchExactFields: exactFieldsArray.toString() };
};

export default getSearchQueries;
