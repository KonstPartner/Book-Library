import {
  BOOKS_CSV_PATH,
  RATINGS_CSV_PATH,
} from '../../../seed/import/config.js';
import { addBookAndCategory, addRating, addUser } from './addDataToDB.js';
import importData from './importData.js';

export const importBookAndCategories = async () => {
  importData(addBookAndCategory, BOOKS_CSV_PATH, 'BooksAndCategories');
};

export const importUsers = async () => {
  importData(addUser, RATINGS_CSV_PATH, 'Users');
};

export const importRatings = async () => {
  importData(addRating, RATINGS_CSV_PATH, 'Ratings');
};
