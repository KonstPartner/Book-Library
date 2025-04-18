import { ulid } from 'ulid';
import sequelize from '../config/database.js';
import {
  BookAttributes,
  RatingAttributes,
  UserAttributes,
} from '../models/modelsInterfaces.js';
import Rating from '../models/Rating.js';
import { findByPkBookRequest } from './booksServices.js';
import { findByPkUserRequest } from './usersServices.js';
import User from '../models/User.js';
import Book from '../models/Book.js';
import { WhereOptions } from 'sequelize';
import { Request } from 'express';

const findAllRatingsRequest = async (
  limit: number,
  offset: number,
  searchQueries: WhereOptions<RatingAttributes> | undefined
) =>
  await Rating.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    where: searchQueries,
    attributes: { exclude: ['categoryId'] },
  });

const findByPkRatingRequest = async (RatingId: string) =>
  await Rating.findByPk(RatingId, {
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['title'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    ],
  });

const createRatingRequest = async (
  req: Request,
  data: Omit<RatingAttributes, 'userId'> & { category?: string }
) => {
  const userId = (req as any).user.id;

  const existinRating = await Rating.findOne({
    where: { bookId: data.bookId, userId },
  });
  if (existinRating) {
    throw {
      code: 400,
      message: 'You already have a rating for this book.',
    };
  }

  const transaction = await sequelize.transaction();
  try {
    const book = await findByPkBookRequest(String(data.bookId));
    const user = await findByPkUserRequest(String(userId));
    if (!book) throw { code: 404, message: 'Cannot find book' };
    if (!user) throw { code: 404, message: 'Cannot find user' };

    const newRating = await Rating.create(
      {
        id: ulid(),
        bookId: data.bookId,
        userId,
        reviewHelpfulness: data.reviewHelpfulness || null,
        reviewScore: data.reviewScore || null,
        reviewSummary: data.reviewSummary || null,
        reviewText: data.reviewText || null,
      },
      { transaction }
    );
    await transaction.commit();

    return await findByPkRatingRequest(String(newRating.id));
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findAllBookRatingsRequest = async (
  BookId: string,
  limit: number,
  offset: number,
  sortRatingsBy: string | undefined,
  sortRatingsUsersOrBooksBy: string | undefined,
  sortOrder: string,
  searchQueries: WhereOptions<RatingAttributes> | undefined,
  searchUserQuery: WhereOptions<UserAttributes> | undefined
) =>
  await Rating.findAndCountAll({
    where: { ...{ ...searchQueries, bookId: BookId } },
    limit,
    offset,
    ...(sortRatingsUsersOrBooksBy === 'name'
      ? { order: [[{ model: User, as: 'user' }, 'name', sortOrder]] }
      : {
          order: [[sortRatingsBy || 'reviewScore', sortOrder]],
        }),
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['title'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['name'],
        where: searchUserQuery,
      },
    ],
  });

const findAllUserRatingsRequest = async (
  UserId: string,
  limit: number,
  offset: number,
  sortRatingsBy: string | undefined,
  sortRatingsUsersOrBooksBy: string | undefined,
  sortOrder: string,
  searchQueries: WhereOptions<RatingAttributes> | undefined,
  searchBookQuery: WhereOptions<BookAttributes> | undefined
) =>
  await Rating.findAndCountAll({
    where: { ...{ ...searchQueries, userId: UserId } },
    limit,
    offset,
    ...(sortRatingsUsersOrBooksBy === 'title'
      ? { order: [[{ model: Book, as: 'book' }, 'title', sortOrder]] }
      : {
          order: [[sortRatingsBy || 'reviewScore', sortOrder]],
        }),
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['title'],
        where: searchBookQuery,
      },
      {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    ],
  });

const destroyRatingRequest = async (req: Request, ratingId: string) => {
  const rating = await Rating.findByPk(ratingId);
  if (!rating) {
    throw { code: 404, message: `Error: No such rating with id ${ratingId}` };
  }

  if (rating.userId !== (req as any).user.id) {
    throw { code: 403, message: 'You can only delete your own ratings.' };
  }

  return await Rating.destroy({ where: { id: ratingId } });
};

const updateRatingRequest = async (
  req: Request,
  data: Partial<RatingAttributes>
) => {
  const { id, ...updates } = data;

  const rating = await Rating.findByPk(id);
  if (!rating) {
    throw { code: 404, message: `Error: No such rating with id ${id}` };
  }

  if (rating.userId !== (req as any).user.id) {
    throw { code: 403, message: 'You can only update your own ratings.' };
  }

  Object.assign(rating, updates);
  await rating.save();

  return rating;
};

export {
  findAllRatingsRequest,
  findByPkRatingRequest,
  findAllBookRatingsRequest,
  findAllUserRatingsRequest,
  createRatingRequest,
  destroyRatingRequest,
  updateRatingRequest,
};
