import {
  SearchBooksFieldsType,
  SearchRatingsFieldsType,
} from '@/types/SearchFields';

const booksInputFields: (keyof SearchBooksFieldsType)[] = [
  'title',
  'description',
  'author',
  'publishedDate',
  'publisher',
  'category',
];

const ratingsInputFields: (keyof SearchRatingsFieldsType)[] = [
  'reviewHelpfulness',
  'reviewScore',
  'reviewSummary',
  'reviewText',
];

export { booksInputFields, ratingsInputFields };
