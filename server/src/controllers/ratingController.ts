import { Request, Response } from 'express';
import Rating from '../models/Rating.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import { transformRating } from '../utils/transformModel.ts';
import {
  createRatingRequest,
  destroyRating,
  findByPkRatingRequest,
} from '../services/ratingsServices.ts';
import { RatingType } from '../types.ts';

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
    const newRating: Rating = (await createRatingRequest(req.body)) as Rating;
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
    await destroyRating(req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete rating ' + req.params.id,
    });
  }
};

export { getRatingById, postRating, deleteRatingById };
