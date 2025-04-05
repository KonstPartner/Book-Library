import { Request, Response } from 'express';
import {
  handleSuccessResponse,
  handleErrorResponse,
} from '../utils/handleResponse.js';
import {
  changePasswordRequest,
  createRegisteredUserRequest,
  loginUserRequest,
  refreshTokenRequest,
} from '../services/authServices.js';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      throw { code: 400, message: 'Name and password are required.' };
    }

    const { user, accessToken, refreshToken } =
      await createRegisteredUserRequest(name, password);
    handleSuccessResponse(res, {
      user: { id: user.id, name: user.name },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to register user.',
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      throw { code: 400, message: 'Name and password are required.' };
    }

    const { accessToken, refreshToken, user } = await loginUserRequest(
      name,
      password
    );
    handleSuccessResponse(res, { accessToken, refreshToken, user });
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to login.',
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw { code: 400, message: 'Refresh token is required.' };
    }

    const tokens = await refreshTokenRequest(refreshToken);
    handleSuccessResponse(res, tokens);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to refresh token.',
    });
  }
};

const getProfile = (req: Request, res: Response) => {
  const user = (req as any).user;

  handleSuccessResponse(res, { id: user.id, name: user.name });
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { oldPassword, newPassword } = req.body;

    await changePasswordRequest(userId, oldPassword, newPassword);

    handleSuccessResponse(res, { message: 'Password changed successfully.' });
  } catch (error) {
    handleErrorResponse({ res, error, message: 'Failed to change password.' });
  }
};

export { registerUser, loginUser, refreshToken, getProfile, changePassword };
