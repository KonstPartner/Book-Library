import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  createUserRequest,
  destroyUserRequest,
  findAllUsersRequest,
  findByPkUserRequest,
  updateUserRequest,
} from '../services/usersServices.ts';
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
  const {
    limit,
    offset,
    searchRatingsQueries,
    sortRatingsBy,
    sortRatingsUsersOrBooksBy,
    sortOrder,
    searchRatingsBookQuery,
  } = getRequestQueries(req);
  try {
    const { count, rows: ratings } = await findAllUserRatingsRequest(
      UserId,
      limit,
      offset,
      sortRatingsBy,
      sortRatingsUsersOrBooksBy,
      sortOrder,
      searchRatingsQueries,
      searchRatingsBookQuery
    );

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    handleSuccessResponse(res, {
      data: modifiedRatings,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    });
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
    await destroyUserRequest(req, req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete user ' + req.params.id,
    });
  }
};

const patchUserById = async (req: Request, res: Response) => {
  try {
    const user = await updateUserRequest(req, {
      id: req.params.id,
      ...req.body,
    });
    handleSuccessResponse(res, user);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to update user ' + req.params.id,
    });
  }
};

export {
  getAllUsers,
  getUserById,
  getAllUserRatings,
  postUser,
  deleteUserById,
  patchUserById,
};
