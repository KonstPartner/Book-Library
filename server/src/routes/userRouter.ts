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
  validateRefreshToken,
} from '../middleware/validators/validators.ts';
import {
  getProfile,
  loginUser,
  refreshToken,
  registerUser,
} from '../controllers/authController.ts';
import authMiddleware from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', validateLimitAndOffset, validationErrorHandler, getAllUsers);

router.get('/profile', authMiddleware, getProfile);

router.get('/:id', validateIdString, validationErrorHandler, getUserById);

router.get(
  '/:id/ratings',
  validateGetAllRatings,
  validationErrorHandler,
  getAllUserRatings
);

router.post('/', validatePostUser, validationErrorHandler, postUser);

router.post(
  '/register',
  validateAuthUser,
  validationErrorHandler,
  registerUser
);

router.post('/login', validateAuthUser, validationErrorHandler, loginUser);

router.post(
  '/refresh',
  validateRefreshToken,
  validationErrorHandler,
  refreshToken
);

router.delete('/:id', validateIdString, validationErrorHandler, deleteUserById);

router.patch('/:id', validatePatchUser, validationErrorHandler, patchUserById);

export default router;
