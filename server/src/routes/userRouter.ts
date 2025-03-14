import express from 'express';
import validationErrorHandler from '../middleware/validationErrorHandler.ts';
import {
  deleteUserById,
  getAllUserRatings,
  getAllUsers,
  getUserById,
  patchUserById,
  postUser,
} from '../controllers/userController.ts';
import {
  validateAuthUser,
  validateGetAllRatings,
  validateIdString,
  validateLimitAndOffset,
  validatePatchUser,
  validatePostUser,
} from '../middleware/validators/validators.ts';
import { loginUser, registerUser } from '../controllers/authController.ts';

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

router.post('/register', validateAuthUser, validationErrorHandler, registerUser);

router.post('/login', validateAuthUser, validationErrorHandler, loginUser);

router.delete('/:id', validateIdString, validationErrorHandler, deleteUserById);

router.patch('/:id', validatePatchUser, validationErrorHandler, patchUserById);

export default router;
