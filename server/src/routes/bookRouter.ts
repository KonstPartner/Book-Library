import express from 'express';
import {
  getAllBooks,
  getAllBookRatings,
  getBookById,
  getRandomBooks,
  postBook,
  deleteBookById,
  patchBookById,
} from '../controllers/bookController.ts';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  validateGetAllBooks,
  validateGetAllRatings,
  validateIdInt,
  validateLimit,
  validatePatchBook,
  validatePostBook,
} from '../middleware/validators/validators.ts';
import authMiddleware from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', validateGetAllBooks, validationErrorHandler, getAllBooks);

router.get('/random', validateLimit, validationErrorHandler, getRandomBooks);

router.get('/:id', validateIdInt, validationErrorHandler, getBookById);

router.get(
  '/:id/ratings',
  validateGetAllRatings,
  validationErrorHandler,
  getAllBookRatings
);

router.post(
  '/',
  authMiddleware,
  validatePostBook,
  validationErrorHandler,
  postBook
);

router.delete(
  '/:id',
  authMiddleware,
  validateIdInt,
  validationErrorHandler,
  deleteBookById
);

router.patch(
  '/:id',
  authMiddleware,
  validatePatchBook,
  validationErrorHandler,
  patchBookById
);

export default router;
