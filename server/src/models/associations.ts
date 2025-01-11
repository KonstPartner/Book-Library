import Category from './Category.ts';
import Book from './Book.ts';
import Rating from './Rating.ts';

Category.hasMany(Book, {
  foreignKey: 'categoryId',
  as: 'books',
});

Book.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Book.hasMany(Rating, {
  foreignKey: 'bookId',
  as: 'ratings',
});

Rating.belongsTo(Book, {
  foreignKey: 'bookId',
  as: 'book',
});

export default () => {};
