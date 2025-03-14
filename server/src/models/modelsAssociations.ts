import Category from './Category.ts';
import Book from './Book.ts';
import Rating from './Rating.ts';
import User from './User.ts';
import RegisteredUser from './RegisteredUser.ts';

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

User.hasMany(Rating, {
  foreignKey: 'userId',
  as: 'ratings',
});

Rating.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(RegisteredUser, {
  foreignKey: 'users_id',
  as: 'registeredUsers',
});

RegisteredUser.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

export default () => {};
