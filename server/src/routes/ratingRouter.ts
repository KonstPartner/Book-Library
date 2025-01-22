import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import { postRating } from '../controllers/ratingController.ts';
import { validatePostRating } from '../middleware/validators/validators.ts';

const router = express.Router();

router.post('/', validatePostRating, validationErrorHandler, postRating);

export default router;
