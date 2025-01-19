import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  findAllUserRatingsRequest,
  findAllUsersRequest,
  findByPkUserRequest,
} from '../requests/usersTable.ts';
import { RatingsWithBookType } from '../types.ts';
import { transformRatingWithBook } from '../utils/transformModel.ts';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = getRequestQueries(req, { defaultLimit: 25 });
    const users = await findAllUsersRequest(limit, offset);
    handleSuccessResponse(res, users);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to fetch users.',
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const UserId = req.params.id;
  try {
    const user = await findByPkUserRequest(UserId);
    if (!user) {
      handleErrorResponse({
        res,
        message: `Invalid user ID ${UserId}: no such user`,
        code: 404,
      });
      return;
    }
    handleSuccessResponse(res, user);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: `Failed to fetch user ${UserId}.`,
    });
  }
};

const getAllUserRatings = async (req: Request, res: Response) => {
  const UserId = req.params.id;
  const { limit, offset } = getRequestQueries(req);
  try {
    const ratings: RatingsWithBookType = await findAllUserRatingsRequest(
      UserId,
      limit,
      offset
    );

    if (!ratings.length) {
      handleErrorResponse({
        res,
        message: `No ratings found for user ID ${UserId}`,
        code: 404,
      });
      return;
    }

    const modifiedRatings = ratings.map((rating) => transformRatingWithBook(rating));

    handleSuccessResponse(res, modifiedRatings);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch user ${UserId}.`,
      error,
    });
  }
};

export { getAllUsers, getUserById, getAllUserRatings };
