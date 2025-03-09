import { searchPageCardsLimit } from '@/constants/cardsLimit';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getSearchQueries from './getSearchQueries';
import { SortOptionsType } from '@/types/SortOptionsType';

const createSearchQueryString = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>(
  search: T,
  sortOptions: SortOptionsType,
  fields: Array<keyof T>
): string => {
  const params = new URLSearchParams();
  const { searchFields, searchExactFields } = getSearchQueries(search);

  fields.forEach((field) => {
    const fieldStr = field as string;
    const value = searchFields[fieldStr]?.trim();
    if (value) {
      params.append(fieldStr, value);
    }
  });

  if (sortOptions.sortBy) {
    params.append('sortBy', sortOptions.sortBy);
  }
  if (sortOptions.sortOrder) {
    params.append('sortOrder', sortOptions.sortOrder);
  }

  if (searchExactFields) {
    params.append('exact', searchExactFields);
  }

  params.append('limit', searchPageCardsLimit.toString());

  return params.toString();
};

export default createSearchQueryString;
