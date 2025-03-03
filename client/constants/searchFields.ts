import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const booksInputFields: (keyof Partial<BookType>)[] = [
  'title',
  'description',
  'author',
  'publishedDate',
  'publisher',
  'category',
];

const ratingsInputFields: (keyof Partial<RatingType>)[] = [
  'reviewHelpfulness',
  'reviewScore',
  'reviewSummary',
  'reviewText',
];

const bookDataFields: SearchBookFieldsType = {
  title: { field: '', isExact: false },
  description: { field: '', isExact: false },
  author: { field: '', isExact: false },
  publishedDate: { field: '', isExact: false },
  publisher: { field: '', isExact: false },
  category: { field: '', isExact: false },
};

const ratingDataFields: SearchRatingFieldsType = {
  reviewHelpfulness: { field: '', isExact: false },
  reviewScore: { field: '', isExact: false },
  reviewSummary: { field: '', isExact: false },
  reviewText: { field: '', isExact: false },
  book: { field: '', isExact: false },
  user: { field: '', isExact: false },
};

export {
  booksInputFields,
  ratingsInputFields,
  bookDataFields,
  ratingDataFields,
};
