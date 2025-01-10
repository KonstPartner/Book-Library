import Category from './Category.ts';
import Book from './Book.ts';

Category.hasMany(Book, {
  foreignKey: 'categoryId',
  as: 'books',
});

Book.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

export default () => {}