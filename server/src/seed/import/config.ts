import dotenv from 'dotenv';
dotenv.config();

export const BOOKS_CSV_PATH = process.env.CSV_BOOKS_PATH as string;

export const RATINGS_CSV_PATH = process.env.CSV_RATINGS_PATH as string;

export const BATCH_SIZE = 1000;
