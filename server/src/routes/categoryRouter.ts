import express from 'express';
import { param, query } from 'express-validator';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  getAllCategories,
  getCategoryById,
} from '../controllers/categoryController.ts';

const router = express.Router();

router.get(
  '/',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
  validationErrorHandler,
  getAllCategories
);

router.get(
  '/:id',
  [param('id').trim().isInt({ min: 1 })],
  validationErrorHandler,
  getCategoryById
);

export default router;
