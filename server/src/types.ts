import Book from './models/Book.js';
import Rating from './models/Rating.js';

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
