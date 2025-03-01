import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const createSearchQueryString = (
  search: Partial<BookType> | Partial<RatingType>,
  fields: (keyof Partial<BookType> | keyof Partial<RatingType>)[]
) => {
  const params = new URLSearchParams();

  for (const field of fields) {
    const value = (search as Partial<BookType> & Partial<RatingType>)[field];
    if (value?.toString().trim())
      params.append(field, value?.toString().trim());
  }

  params.append('limit', '12');

  return params.toString();
};

export default createSearchQueryString;
