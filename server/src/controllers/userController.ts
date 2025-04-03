import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.js';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.js';
import {
  createUserRequest,
  destroyUserRequest,
  findAllUsersRequest,
  findByPkUserRequest,
  updateUserRequest,
} from '../services/usersServices.js';
import User from '../models/User.js';
import { transformRating } from '../utils/transformModel.js';
import { findAllUserRatingsRequest } from '../services/ratingsServices.js';
import redis from '../config/redis.js';
import updateRedisCache from '../utils/updateRedisCache.js';
import simplifyWhereOptions from '../utils/simplifyWhereOptions.js';
import { holdCacheTime } from '../config/config.js';

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
  const cacheKey = `user:${UserId}`;

  try {
    const cachedUser = await redis.get(cacheKey);
    if (cachedUser) {
      return handleSuccessResponse(res, JSON.parse(cachedUser));
    }

    const user = await findByPkUserRequest(UserId);
    if (!user) {
      handleErrorResponse({
        res,
        message: `Invalid user ID ${UserId}: no such user`,
        code: 404,
      });
      return;
    }

    await redis.set(cacheKey, JSON.stringify(user), 'EX', holdCacheTime.users);

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

  const cacheKey = `user:${UserId}:ratings:${limit}:${offset}:${
    sortRatingsBy || 'none'
  }:${
    sortRatingsUsersOrBooksBy ? 'book' : 'none'
  }:${sortOrder}:${simplifyWhereOptions(
    searchRatingsQueries
  )}:${simplifyWhereOptions(searchRatingsBookQuery, 'book')}`;

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

    if (count > 1000) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return handleSuccessResponse(res, JSON.parse(cachedData));
      }
    }

    const modifiedRatings = ratings.map((rating) => transformRating(rating));

    const totalPages = Math.ceil(count / limit);
    const currentPage = offset / limit + 1;

    const responseData = {
      data: modifiedRatings,
      metadata: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: limit,
      },
    };

    if (count > 1000) {
      await redis.set(
        cacheKey,
        JSON.stringify(responseData),
        'EX',
        holdCacheTime.users
      );
    }

    handleSuccessResponse(res, responseData);
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
  const userId = req.params.id;
  const userCacheKey = `user:${userId}`;
  const ratingsCachePattern = `user:${userId}:ratings:*`;

  try {
    await destroyUserRequest(req, userId);

    await redis.del(userCacheKey);

    const ratingsKeys = await redis.keys(ratingsCachePattern);
    if (ratingsKeys.length > 0) {
      await redis.del(ratingsKeys);
    }

    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete user ' + userId,
    });
  }
};

const patchUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  try {
    const user = await updateUserRequest(req, {
      id: userId,
      ...req.body,
    });

    const cachedUser = await redis.get(cacheKey);
    if (cachedUser) {
      await updateRedisCache(req, cachedUser, cacheKey);
    }

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
