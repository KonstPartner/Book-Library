import express from 'express';
import { param, query } from 'express-validator';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  getAllUserRatings,
  getAllUsers,
  getUserById,
} from '../controllers/userController.ts';

const router = express.Router();

router.get(
  '/',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
  validationErrorHandler,
  getAllUsers
);

router.get(
  '/:id',
  [param('id').trim().isString()],
  validationErrorHandler,
  getUserById
);

router.get(
  '/:id/ratings',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
  validationErrorHandler,
  getAllUserRatings
);

export default router;
