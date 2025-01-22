import express from 'express';
import {
  getAllBooks,
  getAllBookRatings,
  getBookById,
  getBookRatingById,
  getRandomBooks,
  postBook,
} from '../controllers/bookController.ts';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  validateGetAllBooks,
  validateIdInt,
  validateIdIntAndRatingId,
  validateLimit,
  validateLimitAndOffset,
  validatePostBook,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateGetAllBooks, validationErrorHandler, getAllBooks);

router.get('/random', validateLimit, validationErrorHandler, getRandomBooks);

router.get('/:id', validateIdInt, validationErrorHandler, getBookById);

router.get(
  '/:id/ratings',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllBookRatings
);

router.get(
  '/:id/ratings/:ratingId',
  validateIdIntAndRatingId,
  validationErrorHandler,
  getBookRatingById
);

router.post('/', validatePostBook, validationErrorHandler, postBook);

export default router;
