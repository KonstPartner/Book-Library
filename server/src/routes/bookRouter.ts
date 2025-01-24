import express from 'express';
import {
  getAllBooks,
  getAllBookRatings,
  getBookById,
  getRandomBooks,
  postBook,
  deleteBookById,
} from '../controllers/bookController.ts';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  validateGetAllBooks,
  validateGetAllRatings,
  validateIdInt,
  validateLimit,
  validatePostBook,
} from '../middleware/validators/validators.ts';

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

router.post('/', validatePostBook, validationErrorHandler, postBook);

router.delete('/:id', validateIdInt, validationErrorHandler, deleteBookById);

export default router;
