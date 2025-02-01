import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteRatingById,
  getAllRatings,
  getRatingById,
  patchRatingById,
  postRating,
} from '../controllers/ratingController.ts';
import {
  validateGetAllRatings,
  validateIdString,
  validatePatchRating,
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

router.patch('/:id', validatePatchRating, validationErrorHandler, patchRatingById);

export default router;
