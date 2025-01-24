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
  validateGetAllRatings,
  validateIdString,
  validateLimitAndOffset,
  validatePostUser,
} from '../middleware/validators/validators.ts';

const router = express.Router();

router.get('/', validateLimitAndOffset, validationErrorHandler, getAllUsers);

router.get('/:id', validateIdString, validationErrorHandler, getUserById);

router.get(
  '/:id/ratings',
  validateGetAllRatings,
  validationErrorHandler,
  getAllUserRatings
);

router.post('/', validatePostUser, validationErrorHandler, postUser);

router.delete('/:id', validateIdString, validationErrorHandler, deleteUserById);

export default router;
