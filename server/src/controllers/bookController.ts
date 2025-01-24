import { Request, Response } from 'express';
import { BookType, RatingsWithUserType, RatingWithUserType } from '../types.ts';
import {
  createBookRequest,
  destroyBook,
  findAllBookRatingsRequest,
  findAllBooksRequest,
  findByPkBookRatingRequest,
  findByPkBookRequest,
  findRandomBooksRequest,
} from '../services/booksServices.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  transformBook,
  transformRatingWithUser,
} from '../utils/transformModel.ts';
import getRequestQueries from '../utils/getRequestQueries.ts';
import Book from '../models/Book.ts';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { limit, offset, searchBooksQueries, searchBooksCategoryQuery } =
      getRequestQueries(req);
    const books = await findAllBooksRequest(
      limit,
      offset,
      searchBooksQueries,
      searchBooksCategoryQuery
    );
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
  const { limit, offset, searchRatingsQueries, searchRatingsUserQuery } =
    getRequestQueries(req);
  try {
    const ratings: RatingsWithUserType = await findAllBookRatingsRequest(
      BookId,
      limit,
      offset,
      searchRatingsQueries,
      searchRatingsUserQuery
    );

    if (!ratings.length) {
      handleErrorResponse({
        res,
        message: `No ratings found for book ID ${BookId}`,
        code: 404,
      });
      return;
    }

    const modifiedRatings = ratings.map((rating) =>
      transformRatingWithUser(rating)
    );

    handleSuccessResponse(res, modifiedRatings);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch book ${BookId}.`,
      error,
    });
  }
};

const getBookRatingById = async (req: Request, res: Response) => {
  const RatingId = req.params.ratingId;
  try {
    const rating: RatingWithUserType | null = await findByPkBookRatingRequest(
      RatingId
    );

    if (!rating) {
      handleErrorResponse({
        res,
        message: `Invalid rating ID ${RatingId}: no such rating`,
        code: 404,
      });
      return;
    }

    const modifiedRating = transformRatingWithUser(rating);

    handleSuccessResponse(res, modifiedRating);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch rating ${RatingId}.`,
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
    await destroyBook(req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete book ' + req.params.id,
    });
  }
};

export {
  getAllBooks,
  getBookById,
  getAllBookRatings,
  getBookRatingById,
  getRandomBooks,
  postBook,
  deleteBookById,
};
