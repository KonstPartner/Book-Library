import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

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

const bookDataFields: Partial<BookType> = {
  title: '',
  description: '',
  author: '',
  publishedDate: '',
  publisher: '',
  category: '',
};

const ratingDataFields: Partial<RatingType> = {
  reviewHelpfulness: '',
  reviewScore: '',
  reviewSummary: '',
  reviewText: '',
};

export { booksInputFields, ratingsInputFields, bookDataFields, ratingDataFields };
