import { searchPageCardsLimit } from '@/constants/cardsLimit';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const createSearchQueryString = (
  search: SearchBookFieldsType | SearchRatingFieldsType,
  fields: (keyof SearchBookFieldsType | keyof SearchRatingFieldsType)[]
) => {
  const params = new URLSearchParams();

  for (const field of fields) {
    const value = (search as SearchBookFieldsType & SearchRatingFieldsType)[
      field
    ].field;
    if (value?.toString().trim())
      params.append(field, value?.toString().trim());
  }

  params.append('limit', searchPageCardsLimit.toString());

  return params.toString();
};

export default createSearchQueryString;
