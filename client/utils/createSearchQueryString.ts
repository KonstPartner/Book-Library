import { searchPageCardsLimit } from '@/constants/cardsLimit';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';
import getSearchQueries from './getSearchQueries';

const createSearchQueryString = (
  search: SearchBookFieldsType | SearchRatingFieldsType,
  fields: (keyof SearchBookFieldsType | keyof SearchRatingFieldsType)[]
): string => {
  const params = new URLSearchParams();
  const { searchFields, searchExactFields } = getSearchQueries(search);

  fields.forEach((field) => {
    const value = searchFields[field]?.trim();
    if (value) {
      params.append(field, value);
    }
  });

  if (searchExactFields) {
    params.append('exact', searchExactFields);
  }

  params.append('limit', searchPageCardsLimit.toString());

  return params.toString();
};

export default createSearchQueryString;
