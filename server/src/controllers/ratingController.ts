import { Request, Response } from 'express';
import Rating from '../models/Rating.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import { transformRating } from '../utils/transformModel.ts';
import {
  createRatingRequest,
  destroyRatingRequest,
  findAllRatingsRequest,
  findByPkRatingRequest,
  updateRatingRequest,
} from '../services/ratingsServices.ts';
import { RatingType } from '../types.ts';
import getRequestQueries from '../utils/getRequestQueries.ts';

const getAllRatings = async (req: Request, res: Response) => {
  try {
    const { limit, offset, searchRatingsQueries } = getRequestQueries(req);
    const ratings = await findAllRatingsRequest(
      limit,
      offset,
      searchRatingsQueries
    );
    handleSuccessResponse(res, ratings);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to fetch ratings.',
    });
  }
};

const getRatingById = async (req: Request, res: Response) => {
  const RatingId = req.params.id;
  try {
    const rating: RatingType | null = await findByPkRatingRequest(RatingId);

    if (!rating) {
      handleErrorResponse({
        res,
        message: `Invalid rating ID ${RatingId}: no such rating`,
        code: 404,
      });
      return;
    }

    handleSuccessResponse(res, transformRating(rating));
  } catch (error) {
    handleErrorResponse({
      res,
      message: `Failed to fetch rating ${RatingId}.`,
      error,
    });
  }
};

const postRating = async (req: Request, res: Response) => {
  try {
    const newRating: Rating = (await createRatingRequest(
      req,
      req.body
    )) as Rating;
    handleSuccessResponse(res, transformRating(newRating));
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to create book rating.',
    });
  }
};

const deleteRatingById = async (req: Request, res: Response) => {
  try {
    await destroyRatingRequest(req, req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete rating ' + req.params.id,
    });
  }
};

const patchRatingById = async (req: Request, res: Response) => {
  try {
    const rating = await updateRatingRequest(req, {
      id: req.params.id,
      ...req.body,
    });
    handleSuccessResponse(res, rating);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to update rating ' + req.params.id,
    });
  }
};

export {
  getAllRatings,
  getRatingById,
  postRating,
  deleteRatingById,
  patchRatingById,
};
