import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  createUserRequest,
  destroyUser,
  findAllUsersRequest,
  findByPkUserRequest,
} from '../services/usersServices.ts';
import { RatingsType } from '../types.ts';
import User from '../models/User.ts';
import { transformRating } from '../utils/transformModel.ts';
import { findAllUserRatingsRequest } from '../services/ratingsServices.ts';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { limit, offset, searchQueryName } = getRequestQueries(req, {
      defaultLimit: 25,
    });
    const users = await findAllUsersRequest(limit, offset, searchQueryName);
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
  const { limit, offset, searchRatingsQueries, searchRatingsBookQuery } =
    getRequestQueries(req);
  try {
    const ratings: RatingsType = await findAllUserRatingsRequest(
      UserId,
      limit,
      offset,
      searchRatingsQueries,
      searchRatingsBookQuery
    );

    if (!ratings.length) {
      handleErrorResponse({
        res,
        message: `No ratings found for user ID ${UserId}`,
        code: 404,
      });
      return;
    }

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

    handleSuccessResponse(res, modifiedRatings);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch user ${UserId}.`,
      error,
    });
  }
};

const postUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = (await createUserRequest(req.body)) as User;
    handleSuccessResponse(res, newUser);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to create user.',
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    await destroyUser(req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete user ' + req.params.id,
    });
  }
};

export {
  getAllUsers,
  getUserById,
  getAllUserRatings,
  postUser,
  deleteUserById,
};
