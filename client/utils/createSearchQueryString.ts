import { SearchBooksFieldsType } from '@/types/SearchFields';

const createSearchQueryString = (
  search: SearchBooksFieldsType,
  fields: (keyof SearchBooksFieldsType)[]
) => {
  const params = new URLSearchParams();

  for (const field of fields) {
    if (search[field]) params.append(field, search[field]);
  }

  params.append('limit', '10');

  return params.toString();
};

export default createSearchQueryString;
