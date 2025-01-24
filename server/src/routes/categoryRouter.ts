import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  postCategory,
} from '../controllers/categoryController.ts';
import {
  validateIdInt,
  validateLimitAndOffset,
  validatePostCategory,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get(
  '/',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllCategories
);

router.get('/:id', validateIdInt, validationErrorHandler, getCategoryById);

router.post('/', validatePostCategory, validationErrorHandler, postCategory);

router.delete('/:id', validationErrorHandler, validateIdInt, deleteCategoryById);

export default router;
