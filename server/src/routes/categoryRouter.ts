import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
} from '../controllers/categoryController.ts';
import {
  validateId,
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

router.delete('/:id', validationErrorHandler, validateId, deleteCategoryById);

export default router;
