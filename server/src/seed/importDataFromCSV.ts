import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import '../models/associations.ts';
import Rating from '../models/Rating.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOKS_CSV_PATH = path.resolve(
  __dirname,
  process.env.CSV_BOOKS_PATH_RELATIVELY_SEED_DIRECTORY as string
);

const RATINGS_CSV_PATH = path.resolve(
  __dirname,
  process.env.CSV_RATINGS_PATH_RELATIVELY_SEED_DIRECTORY as string
);

const BATCH_SIZE = 1000;

const addBookAndCategory = async (row: any) => {
  if (!row.Title) {
    console.error('Error: Missing title!');
    return;
  }

  let category = null;

  if (row.categories.trim()) {
    const [createdCategory] = await Category.findOrCreate({
      where: {
        name: row.categories
          .replace(/^\['|'\]$/g, '')
          .replace(/'\s*,\s*'/g, ', '),
      },
    });
    category = createdCategory;
  }

  await Book.create({
    title: row.Title,
    description: row.description,
    author: row.author.replace(/^\['|'\]$/g, '').replace(/'\s*,\s*'/g, ', '),
    image: row.image,
    publisher: row.publisher,
    publishedDate: row.publishedDate,
    infoLink: row.infoLink,
    categoryId: category ? category.id : null,
  });
};

const addRating = async (row: any) => {
  if (isNaN(parseInt(row.Id))) {
    console.error('Error: Broken row!');
    return;
  }

  if (!row.Title) {
    console.error('Error: Missing title!');
    return;
  }

  const book = await Book.findOne({ where: { title: row.Title } });

  if (!book) {
    console.warn(`No book found with title: ${row.Title}`);
    return;
  }

  await Rating.create({
    bookId: book.id,
    userId: row['User_id'],
    userName: row['profileName'],
    reviewHelpfulness: row['review/helpfulness'],
    reviewScore: row['review/score'],
    reviewSummary: row['review/summary'],
    reviewText: row['review/text'],
  });
};

const importData = async (
  callback: (row: Record<string, string>) => Promise<void>,
  path: string,
  table: string
) => {
  const rowsBuffer: any[] = [];
  let index = 0;

  const processBatch = async () => {
    const dataPromises = rowsBuffer.map(async (row) => {
      try {
        callback(row);
        index++;
      } catch (error) {
        console.error(`Error processing row: ${JSON.stringify(row)}`, error);
      }
    });

    await Promise.all(dataPromises);
    console.log(`${table}: batches processed: ` + index);
    rowsBuffer.length = 0;
  };

  const stream = fs
    .createReadStream(path)
    .pipe(csvParser())
    .on('data', async (row) => {
      rowsBuffer.push(row);

      if (rowsBuffer.length >= BATCH_SIZE) {
        stream.pause();
        processBatch().then(() => stream.resume());
      }
    })
    .on('end', async () => {
      if (rowsBuffer.length > 0) {
        await processBatch();
      }
      console.log(`${table} have been added to the database!`);
    })
    .on('error', (error) => {
      console.error(`Error during ${table} CSV file parsing: `, error);
    });
};

const importBookAndCategories = async () => {
  importData(addBookAndCategory, BOOKS_CSV_PATH, 'BooksAndCategories');
};

const importRatings = async () => {
  importData(addRating, RATINGS_CSV_PATH, 'Ratings');
};

export default async () => {
  await sequelize.sync({ force: true });

  importBookAndCategories();
};
