import { SearchBooksFieldsType, SearchRatingsFieldsType } from '@/types/SearchFields';

const createSearchQueryString = (
  search: SearchBooksFieldsType | SearchRatingsFieldsType,
  fields: (keyof SearchBooksFieldsType | keyof SearchRatingsFieldsType)[]
) => {
  const params = new URLSearchParams();

  for (const field of fields) {
    const value = (search as any)[field];
    if (value.trim()) params.append(field, value.trim());
  }

  params.append('limit', '10');

  return params.toString();
};

export default createSearchQueryString;
