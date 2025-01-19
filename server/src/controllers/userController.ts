import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  findAllUserRatingsRequest,
  findAllUsersRequest,
  findByPkUserRatingRequest,
  findByPkUserRequest,
} from '../requests/usersTable.ts';
import { RatingsWithBookType, RatingWithBookType } from '../types.ts';
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

    const modifiedRatings = ratings.map((rating) =>
      transformRatingWithBook(rating)
    );

    handleSuccessResponse(res, modifiedRatings);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch user ${UserId}.`,
      error,
    });
  }
};

const getUserRatingById = async (req: Request, res: Response) => {
  const RatingId = req.params.ratingId;
  try {
    const rating: RatingWithBookType | null = await findByPkUserRatingRequest(
      RatingId
    );

    if (!rating) {
      handleErrorResponse({
        res,
        message: `Invalid rating ID ${RatingId}: no such rating`,
        code: 404,
      });
      return;
    }

    const modifiedRating = transformRatingWithBook(rating);

    handleSuccessResponse(res, modifiedRating);
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch rating ${RatingId}.`,
      error,
    });
  }
};

export { getAllUsers, getUserById, getAllUserRatings, getUserRatingById };
