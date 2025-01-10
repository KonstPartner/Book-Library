import sequelize from '../config/database.ts';
import Book from '../models/Books.ts';

export default async () => {
  try {
    await sequelize.sync({force: true});

    await Book.create({
      title: 'Book 1',
      description: 'Description for book 1',
      author: 'Author 1',
      image: 'image-url-1',
      publisher: 'Publisher 1',
      publishedDate: '2025-01-01',
      infoLink: 'http://example.com/book1',
    });
    console.log('Books have been added to the database!');
  } catch (error) {
    console.error('Unable to connect to the database or insert data:', error);
  }
};
