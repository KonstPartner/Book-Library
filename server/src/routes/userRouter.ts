import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  getAllUserRatings,
  getAllUsers,
  getUserById,
  getUserRatingById,
} from '../controllers/userController.ts';
import {
  validateIdString,
  validateIdStringAndRatingId,
  validateLimitAndOffset,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateLimitAndOffset, validationErrorHandler, getAllUsers);

router.get('/:id', validateIdString, validationErrorHandler, getUserById);

router.get(
  '/:id/ratings',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllUserRatings
);

router.get(
  '/:id/ratings/:ratingId',
  validateIdStringAndRatingId,
  validationErrorHandler,
  getUserRatingById
);

export default router;
