import { BOOKS_CSV_PATH, RATINGS_CSV_PATH } from '../config.ts';
import { addBookAndCategory, addRating, addUser } from './addDataToDB.ts';
import importData from './importData.ts';

export const importBookAndCategories = async () => {
  importData(addBookAndCategory, BOOKS_CSV_PATH, 'BooksAndCategories');
};

export const importUsers = async () => {
  importData(addUser, RATINGS_CSV_PATH, 'Users');
};

export const importRatings = async () => {
  importData(addRating, RATINGS_CSV_PATH, 'Ratings');
};
