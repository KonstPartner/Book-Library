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
  validateChangePassword,
  validateGetAllRatings,
  validateIdString,
  validateLimitAndOffset,
  validatePatchUser,
  validatePostUser,
  validateRefreshToken,
} from '../middleware/validators/validators.ts';
import {
  changePassword,
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

router.post(
  '/',
  authMiddleware,
  validatePostUser,
  validationErrorHandler,
  postUser
);

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

router.post(
  '/change-password',
  authMiddleware,
  validateChangePassword,
  validationErrorHandler,
  changePassword
);

router.delete(
  '/:id',
  authMiddleware,
  validateIdString,
  validationErrorHandler,
  deleteUserById
);

router.patch(
  '/:id',
  authMiddleware,
  validatePatchUser,
  validationErrorHandler,
  patchUserById
);

export default router;
