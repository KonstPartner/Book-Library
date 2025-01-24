import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteUserById,
  getAllUserRatings,
  getAllUsers,
  getUserById,
  postUser,
} from '../controllers/userController.ts';
import {
  validateIdString,
  validateLimitAndOffset,
  validatePostUser,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateLimitAndOffset, validationErrorHandler, getAllUsers);

router.get('/:id', validateIdString, validationErrorHandler, getUserById);

router.get(
  '/:id/ratings',
  validateLimitAndOffset,
  validationErrorHandler,
  getAllUserRatings
);

router.post('/', validatePostUser, validationErrorHandler, postUser);

router.delete('/:id', validationErrorHandler, validateIdString, deleteUserById);

export default router;
