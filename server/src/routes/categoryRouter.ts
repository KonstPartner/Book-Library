import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  getAllCategories,
  getCategoryById,
} from '../controllers/categoryController.ts';
import {
  validateIdInt,
  validateLimitAndOffset,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get(
  '/',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllCategories
);

router.get('/:id', validateIdInt, validationErrorHandler, getCategoryById);

export default router;
