import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import '../models/associations.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOKS_CSV_PATH = path.resolve(
  __dirname,
  process.env.CSV_BOOKS_PATH_RELATIVELY_SEED_DIRECTORY as string
);

export default async () => {
  try {
    await sequelize.sync({ force: true });

    fs.createReadStream(BOOKS_CSV_PATH)
      .pipe(csvParser())
      .on('data', async (row) => {
        if (!row.title) {
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
          title: row.title,
          description: row.description,
          author: row.author
            .replace(/^\['|'\]$/g, '')
            .replace(/'\s*,\s*'/g, ', '),
          image: row.image,
          publisher: row.publisher,
          publishedDate: row.publishedDate,
          infoLink: row.infoLink,
          categoryId: category ? category.id : null,
        });
      })
      .on('end', () => {
        console.log('Books have been added to the database!');
      })
      .on('error', (error) => {
        console.error('Error during CSV file parsing', error);
      });
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};
