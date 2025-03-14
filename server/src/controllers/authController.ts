import { Request, Response } from 'express';
import {
  handleSuccessResponse,
  handleErrorResponse,
} from '../utils/handleResponse.ts';
import { createRegisteredUserRequest } from '../services/authServices.ts';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!password) {
      throw { code: 400, message: 'Password is required.' };
    }

    const { user } = await createRegisteredUserRequest(name, password);
    handleSuccessResponse(res, { id: user.id, name: user.name });
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to register user.',
    });
  }
};
