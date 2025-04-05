import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.js';
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  postCategory,
} from '../controllers/categoryController.js';
import {
  validateIdInt,
  validateLimitAndOffset,
  validatePostCategory,
} from '../middleware/validators/validators.js';

const router = express.Router();

router.get(
  '/',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllCategories
);

router.get('/:id', validateIdInt, validationErrorHandler, getCategoryById);

router.post('/', validatePostCategory, validationErrorHandler, postCategory);

router.delete(
  '/:id',
  validateIdInt,
  validationErrorHandler,
  deleteCategoryById
);

export default router;
