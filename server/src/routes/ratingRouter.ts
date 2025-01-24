import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteRatingById,
  postRating,
} from '../controllers/ratingController.ts';
import {
  validateId,
  validatePostRating,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.post('/', validatePostRating, validationErrorHandler, postRating);

router.delete('/:id', validationErrorHandler, validateId, deleteRatingById);

export default router;
