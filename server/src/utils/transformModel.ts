import { BookType, RatingWithBookType, RatingWithUserType } from '../types.ts';

const transformBook = (book: BookType) => ({
  ...book.toJSON(),
  category: book.category ? book.category.name : null,
});

const transformRatingWithUser = (rating: RatingWithUserType) => ({
  ...rating.toJSON(),
  user: rating.user ? rating.user.name : null,
});

const transformRatingWithBook = (rating: RatingWithBookType) => ({
  ...rating.toJSON(),
  book: rating.book ? rating.book.title : null,
});

export { transformBook, transformRatingWithUser, transformRatingWithBook };
