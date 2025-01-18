import express from 'express';
import { param, query } from 'express-validator';
import {
  getAllBooks,
  getAllBookRatings,
  getBookById,
  getBookRatingById,
} from '../controllers/bookController.ts';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';

const router = express.Router();

router.get(
  '/',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
  validationErrorHandler,
  getAllBooks
);

router.get(
  '/:id',
  [param('id').trim().isInt({ min: 1 })],
  validationErrorHandler,
  getBookById
);

router.get(
  '/:id/ratings',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
  validationErrorHandler,
  getAllBookRatings
);

router.get(
  '/:id/ratings/:ratingId',
  [
    param('id').trim().isInt({ min: 1 }),
    param('ratingId').trim().isInt({ min: 1 }),
  ],
  validationErrorHandler,
  getBookRatingById
);

export default router;
