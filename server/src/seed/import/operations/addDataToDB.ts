import { ulid } from 'ulid';
import Book from '../../../models/Book.ts';
import Category from '../../../models/Category.ts';
import Rating from '../../../models/Rating.ts';
import User from '../../../models/User.ts';
import { checkBooksAndCategiries, checkRatingRow } from '../utils/checkRow.ts';
import cutBracketsAndQuotes from '../utils/cutBracketsAndQuotes.ts';
import validateRow from '../utils/validateRow.ts';
import validateUser from '../utils/validateUser.ts';

export const addBookAndCategory = async (row: any) => {
  row.infoLink = row.infoLink.split('=').slice(0, 2).join('=');
  row.categories = cutBracketsAndQuotes(row.categories);
  row.authors = cutBracketsAndQuotes(row.authors);
  if (!checkBooksAndCategiries(row)) return;

  validateRow(row);

  let category = null;

  if (row.categories) {
    const [createdCategory] = await Category.findOrCreate({
      where: { name: row.categories },
    });
    category = createdCategory;
  }

  await Book.create({
    title: row.Title,
    description: row.description,
    author: row.authors,
    image: row.image,
    publisher: row.publisher,
    publishedDate: row.publishedDate,
    infoLink: row.infoLink,
    categoryId: category ? category.id : null,
  });
};

export const addUser = async (row: any) => {
  const id = ulid();

  let cleanProfileName = validateUser(row['profileName']);

  if (!row['User_id'] || !cleanProfileName) {
    cleanProfileName = 'Unknown User';
  }

  if (!checkRatingRow(row)) return;

  return await User.findOrCreate({
    where: {
      name: cleanProfileName,
    },
    defaults: {
      id,
      name: cleanProfileName,
    },
  });
};

export const addRating = async (row: any) => {
  const id = ulid();

  let cleanProfileName = validateUser(row['profileName']);

  if (!row['User_id'] || !cleanProfileName) {
    cleanProfileName = 'Unknown User';
  }

  if (!checkRatingRow(row)) return;

  validateRow(row);

  const book = await Book.findOne({ where: { title: row.Title } });

  if (!book) {
    console.warn(`No book found with title: ${row.Title}`);
    return;
  }

  const user = await User.findOne({ where: { name: cleanProfileName } });

  if (!user) {
    console.warn(`No user found with name: ${cleanProfileName}`);
    return;
  }

  return await Rating.create({
    id,
    bookId: book.id,
    userId: user.id,
    reviewHelpfulness: row['review/helpfulness'],
    reviewScore: row['review/score'],
    reviewSummary: row['review/summary'],
    reviewText: row['review/text'],
  });
};
