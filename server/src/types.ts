import Book from './models/Book.ts';
import Rating from './models/Rating.ts';

type RatingsWithUserType = Array<Rating & RatingWithUserType>;

type RatingWithUserType = Rating & {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user?: { name: string } | null;
};

type RatingsWithBookType = Array<Rating & RatingWithBookType>;

type RatingWithBookType = Rating & {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  book?: { title: string };
};

type BookType = Book & {
  category?: { name: string };
};

export {
  RatingWithUserType,
  RatingsWithUserType,
  BookType,
  RatingsWithBookType,
  RatingWithBookType,
};
