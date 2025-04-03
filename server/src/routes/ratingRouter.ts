import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.js';
import {
  deleteRatingById,
  getAllRatings,
  getRatingById,
  patchRatingById,
  postRating,
} from '../controllers/ratingController.js';
import {
  validateGetAllRatings,
  validateIdString,
  validatePatchRating,
  validatePostRating,
} from '../middleware/validators/validators.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', validateGetAllRatings, validationErrorHandler, getAllRatings);

router.get('/:id', validateIdString, validationErrorHandler, getRatingById);

router.post(
  '/',
  authMiddleware,
  validatePostRating,
  validationErrorHandler,
  postRating
);

router.delete(
  '/:id',
  authMiddleware,
  validateIdString,
  validationErrorHandler,
  deleteRatingById
);

router.patch(
  '/:id',
  authMiddleware,
  validatePatchRating,
  validationErrorHandler,
  patchRatingById
);

export default router;
