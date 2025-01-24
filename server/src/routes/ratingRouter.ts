import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteRatingById,
  getAllRatings,
  getRatingById,
  postRating,
} from '../controllers/ratingController.ts';
import {
  validateGetAllRatings,
  validateIdString,
  validatePostRating,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateGetAllRatings, validationErrorHandler, getAllRatings);

router.get('/:id', validateIdString, validationErrorHandler, getRatingById);

router.post('/', validatePostRating, validationErrorHandler, postRating);

router.delete(
  '/:id',
  validateIdString,
  validationErrorHandler,
  deleteRatingById
);

export default router;
