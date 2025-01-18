import { Request, Response } from 'express';
import { BookType, RatingsType, RatingType } from '../types.ts';
import {
  findAllBookRatingsRequest,
  findAllBooksRequest,
  findByPkBookRatingRequest,
  findByPkBookRequest,
} from '../requests/booksTable.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import { transformBook, transformRating } from '../utils/transformModel.ts';
import getRequestQueries from '../utils/getRequestQueries.ts';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = getRequestQueries(req);
    const books = await findAllBooksRequest(limit, offset);
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
  const { limit, offset } = getRequestQueries(req);
  try {
    const ratings: RatingsType = await findAllBookRatingsRequest(
      BookId,
      limit,
      offset
    );

    if (!ratings.length) {
      handleErrorResponse({
        res,
        message: `No ratings found for book ID ${BookId}`,
        code: 404,
      });
      return;
    }

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

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
    const rating: RatingType | null = await findByPkBookRatingRequest(RatingId);

    if (!rating) {
      handleErrorResponse({
        res,
        message: `Invalid rating ID ${RatingId}: no such rating`,
        code: 404,
      });
      return;
    }

    const modifiedRating = transformRating(rating);

    handleSuccessResponse(res, modifiedRating);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch rating ${RatingId}.`,
      error,
    });
  }
};

export { getAllBooks, getBookById, getAllBookRatings, getBookRatingById };
