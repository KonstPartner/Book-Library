import { BookType, RatingType } from '../types.js';

const transformBook = (book: BookType) => ({
  ...book.toJSON(),
  category: book.category ? book.category.name : null,
});

const transformRating = (rating: RatingType) => ({
  ...rating.toJSON(),
  user: rating.user ? rating.user.name : null,
  book: rating.book ? rating.book.title : null,
});

export { transformBook, transformRating };
