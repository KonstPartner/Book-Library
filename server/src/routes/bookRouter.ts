import express from 'express';
import {
  getAllBooks,
  getAllBookRatings,
  getBookById,
  getBookRatingById,
} from '../controllers/bookController.ts';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  validateGetAllBooks,
  validateIdInt,
  validateIdIntAndRatingId,
  validateLimitAndOffset,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateGetAllBooks, validationErrorHandler, getAllBooks);

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

export default router;
