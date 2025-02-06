import { SearchBooksFieldsType } from '@/types/SearchFields';

const createSearchQueryString = (
  search: SearchBooksFieldsType,
  fields: (keyof SearchBooksFieldsType)[]
) => {
  const params = new URLSearchParams();

  for (const field of fields) {
    if (search[field].trim()) params.append(field, search[field].trim());
  }

  params.append('limit', '10');

  return params.toString();
};

export default createSearchQueryString;
