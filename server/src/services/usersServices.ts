import { WhereOptions } from 'sequelize';
import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Rating from '../models/Rating.ts';
import User from '../models/User.ts';
import {
  BookAttributes,
  RatingAttributes,
  UserAttributes,
} from '../models/modelsInterfaces.ts';
import { ulid } from 'ulid';

const findAllUsersRequest = async (
  limit: number,
  offset: number,
  searchQueries: WhereOptions<UserAttributes> | undefined
) =>
  await User.findAll({
    limit,
    offset,
    where: searchQueries,
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

const createUserRequest = async (data: UserAttributes) => {
  const existingUser = await User.findOne({ where: { name: data.name } });
  if (existingUser) {
    throw {
      code: 400,
      message: 'User already exists. Please choose a different name.',
    };
  }

  const newUser = await User.create({
    id: ulid(),
    name: data.name,
  });

  return await findByPkUserRequest(String(newUser.id));
};

const destroyUser = async (UserId: string) => {
  const user = await User.findByPk(UserId);
  if (!user) {
    throw { code: 404, message: `Error: No such user with id ${UserId}` };
  }
  return await User.destroy({ where: { id: UserId } });
};

export {
  findAllUsersRequest,
  findByPkUserRequest,
  findAllUserRatingsRequest,
  findByPkUserRatingRequest,
  createUserRequest,
  destroyUser,
};
