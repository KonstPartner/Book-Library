import BookType from "@/types/BookType";
import RatingType from "@/types/RatingType";

const bookInputFields = [
  'title',
  'description',
  'author',
  'image',
  'publisher',
  'publishedDate',
  'infoLink',
  'category',
] as const;

const ratingInputFields = [
  'user',
  'reviewScore',
  'reviewSummary',
  'reviewText',
];

const bookDataFields: Partial<BookType> = {
  title: '',
  description: '',
  author: '',
  image: '',
  publisher: '',
  publishedDate: '',
  infoLink: '',
  category: '',
}

const ratingDataFields: Partial<RatingType> = {
  user: '',
  reviewScore: '',
  reviewSummary: '',
  reviewText: '',
}

export { bookInputFields, ratingInputFields, bookDataFields, ratingDataFields };
