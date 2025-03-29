import { Request, Response } from 'express';
import { BookType } from '../types.ts';
import {
  createBookRequest,
  destroyBookRequest,
  findAllBooksRequest,
  findByPkBookRequest,
  findRandomBooksRequest,
  updateBookRequest,
} from '../services/booksServices.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import { transformBook, transformRating } from '../utils/transformModel.ts';
import getRequestQueries from '../utils/getRequestQueries.ts';
import Book from '../models/Book.ts';
import { findAllBookRatingsRequest } from '../services/ratingsServices.ts';
import redis from '../config/redis.ts';
import updateRedisCache from '../utils/updateRedisCache.ts';
import simplifyWhereOptions from '../utils/simplifyWhereOptions.ts';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      limit,
      offset,
      sortBooksBy,
      sortOrder,
      searchBooksQueries,
      searchBooksCategoryQuery,
    } = getRequestQueries(req);

    const cacheKey = `books:${limit}:${offset}:${
      sortBooksBy || 'title'
    }:${sortOrder}:${simplifyWhereOptions(
      searchBooksQueries
    )}:${simplifyWhereOptions(searchBooksCategoryQuery, 'category')}`;
    const { count, rows: books } = await findAllBooksRequest(
      limit,
      offset,
      sortBooksBy,
      sortOrder,
      searchBooksQueries,
      searchBooksCategoryQuery
    );

    if (count > 1000) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return handleSuccessResponse(res, JSON.parse(cachedData));
      }
    }

    const modifiedBooks = books.map((book: BookType) => transformBook(book));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    const responseData = {
      data: modifiedBooks,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    };

    if (count > 1000) {
      await redis.set(cacheKey, JSON.stringify(responseData), 'EX', 3600);
    }

    handleSuccessResponse(res, responseData);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to fetch books.',
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  const BookId = req.params.id;
  const cacheKey = `book:${BookId}`;

  try {
    const cachedBook = await redis.get(cacheKey);
    if (cachedBook) {
      return handleSuccessResponse(res, JSON.parse(cachedBook));
    }

    const book: BookType | null = await findByPkBookRequest(BookId);
    if (!book) {
      handleErrorResponse({
        res,
        message: `Invalid book ID ${BookId}: no such book`,
        code: 404,
      });
      return;
    }
    const modifiedBook = transformBook(book);

    await redis.set(cacheKey, JSON.stringify(modifiedBook), 'EX', 3600);

    handleSuccessResponse(res, modifiedBook);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: `Failed to fetch book ${BookId}.`,
    });
  }
};

const getAllBookRatings = async (req: Request, res: Response) => {
  const BookId = req.params.id;
  const {
    limit,
    offset,
    sortRatingsBy,
    sortRatingsUsersOrBooksBy,
    sortOrder,
    searchRatingsQueries,
    searchRatingsUserQuery,
  } = getRequestQueries(req);

  const cacheKey = `book:${BookId}:ratings:${limit}:${offset}:${
    sortRatingsBy || 'none'
  }:${
    sortRatingsUsersOrBooksBy ? 'user' : 'none'
  }:${sortOrder}:${simplifyWhereOptions(
    searchRatingsQueries
  )}:${simplifyWhereOptions(searchRatingsUserQuery, 'user')}`;

  try {
    const { count, rows: ratings } = await findAllBookRatingsRequest(
      BookId,
      limit,
      offset,
      sortRatingsBy,
      sortRatingsUsersOrBooksBy,
      sortOrder,
      searchRatingsQueries,
      searchRatingsUserQuery
    );

    if (count > 1000) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return handleSuccessResponse(res, JSON.parse(cachedData));
      }
    }

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    const responseData = {
      data: modifiedRatings,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    };

    if (count > 1000) {
      await redis.set(cacheKey, JSON.stringify(responseData), 'EX', 3600);
    }

    handleSuccessResponse(res, responseData);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch book ${BookId}.`,
      error,
    });
  }
};

const getRandomBooks = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = getRequestQueries(req);
    const books = await findRandomBooksRequest(limit, offset);
    const modifiedBooks = books.map((book: BookType) => transformBook(book));
    handleSuccessResponse(res, modifiedBooks);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to fetch books.',
    });
  }
};

const postBook = async (req: Request, res: Response) => {
  try {
    const newBook: Book = (await createBookRequest(req, req.body)) as Book;
    handleSuccessResponse(res, transformBook(newBook));
  } catch (error) {
    handleErrorResponse({ res, error, message: 'Failed to create book.' });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const bookCacheKey = `book:${bookId}`;
  const ratingsCachePattern = `book:${bookId}:ratings:*`;

  try {
    await destroyBookRequest(req, req.params.id);

    await redis.del(bookCacheKey);

    const ratingsKeys = await redis.keys(ratingsCachePattern);
    if (ratingsKeys.length > 0) {
      await redis.del(ratingsKeys);
    }

    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete book ' + req.params.id,
    });
  }
};

const patchBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const cacheKey = `book:${bookId}`;

  try {
    const book = await updateBookRequest(req, {
      id: req.params.id,
      ...req.body,
    });

    const cachedBook = await redis.get(cacheKey);
    if (cachedBook) {
      await updateRedisCache(req, cachedBook, cacheKey);
    }

    handleSuccessResponse(res, book);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to update book ' + req.params.id,
    });
  }
};

export {
  getAllBooks,
  getBookById,
  getAllBookRatings,
  getRandomBooks,
  postBook,
  deleteBookById,
  patchBookById,
};
