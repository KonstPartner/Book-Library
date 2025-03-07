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

    const { count, rows: books } = await findAllBooksRequest(
      limit,
      offset,
      sortBooksBy,
      sortOrder,
      searchBooksQueries,
      searchBooksCategoryQuery
    );

    const modifiedBooks = books.map((book: BookType) => transformBook(book));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    handleSuccessResponse(res, {
      data: modifiedBooks,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    });
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
  try {
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

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    handleSuccessResponse(res, {
      data: modifiedRatings,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    });
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
    const newBook: Book = (await createBookRequest(req.body)) as Book;
    handleSuccessResponse(res, transformBook(newBook));
  } catch (error) {
    handleErrorResponse({ res, error, message: 'Failed to create book.' });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  try {
    await destroyBookRequest(req.params.id);
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
  try {
    const book = await updateBookRequest({ id: req.params.id, ...req.body });
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
