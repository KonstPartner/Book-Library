import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteRatingById,
  getRatingById,
  postRating,
} from '../controllers/ratingController.ts';
import {
  validateIdString,
  validatePostRating,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/:id', validationErrorHandler, validateIdString, getRatingById);

router.post('/', validatePostRating, validationErrorHandler, postRating);

router.delete('/:id', validationErrorHandler, validateIdString, deleteRatingById);

export default router;
