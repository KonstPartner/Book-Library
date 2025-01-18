import Book from './models/Book.ts';
import Rating from './models/Rating.ts';

type RatingsType = Array<Rating & RatingType>;

type RatingType = Rating & {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user?: { name: string } | null;
};

type BookType = Book & {
  category?: { name: string };
};

export { RatingType, RatingsType, BookType };
