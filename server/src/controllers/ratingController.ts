import { Request, Response } from 'express';
import Rating from '../models/Rating.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import { transformRatingWithBook } from '../utils/transformModel.ts';
import {
  createRatingRequest,
  destroyRating,
} from '../services/ratingsServices.ts';

const postRating = async (req: Request, res: Response) => {
  try {
    const newRating: Rating = (await createRatingRequest(req.body)) as Rating;
    handleSuccessResponse(res, transformRatingWithBook(newRating));
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

export { postRating, deleteRatingById };
