import { ulid } from 'ulid';
import sequelize from '../config/database.ts';
import {
  BookAttributes,
  RatingAttributes,
  UserAttributes,
} from '../models/modelsInterfaces.ts';
import Rating from '../models/Rating.ts';
import { findByPkBookRequest } from './booksServices.ts';
import { findByPkUserRequest } from './usersServices.ts';
import User from '../models/User.ts';
import Book from '../models/Book.ts';
import { WhereOptions } from 'sequelize';

const findAllRatingsRequest = async (
  limit: number,
  offset: number,
  searchQueries: WhereOptions<RatingAttributes> | undefined,
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
    attributes: { exclude: ['bookId', 'userId'] },
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
  data: RatingAttributes & { category: string | null }
) => {
  const existinRating = await Rating.findOne({ where: { bookId: data.bookId, userId: data.userId } });
  if (existinRating) {
    throw {
      code: 400,
      message: 'User already has rating for this book.',
    };
  }

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
  searchQueries: WhereOptions<RatingAttributes> | undefined,
  searchUserQuery: WhereOptions<UserAttributes> | undefined
) =>
  await Rating.findAll({
    where: { ...{ ...searchQueries, bookId: BookId } },
    limit,
    offset,
    order: [['id', 'ASC']],
    attributes: { exclude: ['bookId', 'userId'] },
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
  searchQueries: WhereOptions<RatingAttributes> | undefined,
  searchBookQuery: WhereOptions<BookAttributes> | undefined
) =>
  await Rating.findAll({
    where: { ...{ ...searchQueries, userId: UserId } },
    limit,
    offset,
    attributes: { exclude: ['bookId', 'userId'] },
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

const destroyRatingRequest = async (RatingId: string) => {
  const rating = await Rating.findByPk(RatingId);
  if (!rating) {
    throw { code: 404, message: `Error: No such rating with id ${RatingId}` };
  }
  return await Rating.destroy({ where: { id: RatingId } });
};

const updateRatingRequest = async (
  data: Partial<RatingAttributes>
) => {
  const { id, ...updates } = data;

  const rating = await Rating.findByPk(id);
  if (!rating) {
    throw { code: 404, message: `Error: No such rating with id ${id}` };
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
