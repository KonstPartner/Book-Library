import Book from './models/Book.ts';
import Rating from './models/Rating.ts';

type RatingType = Rating & {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user?: { name: string } | null;
  book?: { title: string };
};

type RatingsType = Array<Rating & RatingType>;

type BookType = Book & {
  category?: { name: string };
};

export { BookType, RatingType, RatingsType };
