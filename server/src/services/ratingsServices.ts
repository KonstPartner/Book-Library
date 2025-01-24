import { ulid } from 'ulid';
import sequelize from '../config/database.ts';
import { RatingAttributes } from '../models/modelsInterfaces.ts';
import Rating from '../models/Rating.ts';
import { findByPkBookRequest } from './booksServices.ts';
import {
  findByPkUserRatingRequest,
  findByPkUserRequest,
} from './usersServices.ts';

const createRatingRequest = async (
  data: RatingAttributes & { category: string | null }
) => {
  const transaction = await sequelize.transaction();
  try {
    const book = await findByPkBookRequest(String(data.bookId));
    const user = await findByPkUserRequest(String(data.userId));
    if (!book) throw new Error('Cannot find book');
    if (!user) throw new Error('Cannot find user');

    const newRating = await Rating.create(
      {
        id: ulid(),
        bookId: data.bookId,
        userId: data.userId,
        reviewHelpfulness: data.reviewHelpfulness || null,
        reviewScore: data.reviewScore || null,
        reviewSummary: data.reviewSummary || null,
        reviewText: data.reviewText || null,
      },
      { transaction }
    );
    await transaction.commit();

    return await findByPkUserRatingRequest(String(newRating.id));
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export { createRatingRequest };
