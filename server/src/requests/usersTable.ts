import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Rating from '../models/Rating.ts';
import User from '../models/User.ts';

const findAllUsersRequest = async (limit: number, offset: number) =>
  await User.findAll({
    limit,
    offset,
  });

const findByPkUserRequest = async (UserId: string) =>
  await User.findByPk(UserId, {
    attributes: {
      include: [
        [
          sequelize.literal(`(
          SELECT COUNT(*)
          FROM ratings AS rating
          WHERE rating."userId" = "User"."id"
        )`),
          'ratingsCount',
        ],
      ],
    },
  });

const findAllUserRatingsRequest = async (
  UserId: string,
  limit: number,
  offset: number
) =>
  await Rating.findAll({
    where: { userId: UserId },
    limit,
    offset,
    attributes: { exclude: ['bookId', 'userId'] },
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['title'],
      },
    ],
  });

const findByPkUserRatingRequest = async (RatingId: string) =>
  await Rating.findByPk(RatingId, {
    attributes: { exclude: ['bookId', 'userId'] },
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['title'],
      },
    ],
  });

export {
  findAllUsersRequest,
  findByPkUserRequest,
  findAllUserRatingsRequest,
  findByPkUserRatingRequest,
};
