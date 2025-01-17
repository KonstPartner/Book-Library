import express from 'express';
import { query } from 'express-validator';
import { getAllBooks } from '../controllers/bookController.ts';
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

export default router;
