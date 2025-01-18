import { BookType } from '../types.ts';
import { RatingType } from '../types.ts';

const transformBook = (book: BookType) => ({
  ...book.toJSON(),
  category: book.category ? book.category.name : null,
});

const transformRating = (rating: RatingType) => ({
  ...rating.toJSON(),
  user: rating.user ? rating.user.name : null,
});

export { transformBook, transformRating };
