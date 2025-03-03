import { searchPageCardsLimit } from '@/constants/cardsLimit';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';
import getSearchQueries from './getSearchQueries';

const createSearchQueryString = (
  search: SearchBookFieldsType | SearchRatingFieldsType,
  fields: (keyof SearchBookFieldsType | keyof SearchRatingFieldsType)[]
) => {
  const params = new URLSearchParams();

  const { searchExactFields } = getSearchQueries(search);

  for (const field of fields) {
    const value = (search as SearchBookFieldsType & SearchRatingFieldsType)[
      field
    ].field;

    if (value?.toString().trim())
      params.append(field, value?.toString().trim());
  }

  if (searchExactFields) {
    params.append('exact', searchExactFields);
  }

  params.append('limit', searchPageCardsLimit.toString());

  return params.toString();
};

export default createSearchQueryString;
