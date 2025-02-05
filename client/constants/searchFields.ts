import { SearchBooksFieldsType } from '@/types/SearchFields';

const booksInputFields: (keyof SearchBooksFieldsType)[] = [
  'title',
  'description',
  'author',
  'publishedDate',
  'publisher',
  'category',
];

export { booksInputFields };
