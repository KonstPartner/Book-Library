import Category from './Category.js';
import Book from './Book.js';
import Rating from './Rating.js';
import User from './User.js';
import RegisteredUser from './RegisteredUser.js';

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
  onDelete: 'CASCADE',
});

RegisteredUser.belongsTo(User, {
  foreignKey: 'users_id',
  as: 'user',
});

export default () => {};
