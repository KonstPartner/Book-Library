import { WhereOptions } from 'sequelize';
import sequelize from '../config/database.ts';
import User from '../models/User.ts';
import { UserAttributes } from '../models/modelsInterfaces.ts';
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

const existingUser = async (name: string) => {
  const existingUser = await User.findOne({ where: { name } });
  if (existingUser) {
    throw {
      code: 400,
      message: 'User already exists.',
    };
  }
};

const createUserRequest = async (data: UserAttributes) => {
  await existingUser(data.name);

  const newUser = await User.create({
    id: ulid(),
    name: data.name,
  });

  return await findByPkUserRequest(String(newUser.id));
};

const destroyUserRequest = async (UserId: string) => {
  const user = await User.findByPk(UserId);
  if (!user) {
    throw { code: 404, message: `Error: No such user with id ${UserId}` };
  }
  return await User.destroy({ where: { id: UserId } });
};

const updateUserRequest = async (data: Partial<UserAttributes>) => {
  const { id, ...updates } = data;

  await existingUser(data.name as string);

  const user = await User.findByPk(id);
  if (!user) {
    throw { code: 404, message: `Error: No such user with id ${id}` };
  }

  Object.assign(user, updates);

  await user.save();
  return user;
};

export {
  findAllUsersRequest,
  findByPkUserRequest,
  createUserRequest,
  destroyUserRequest,
  updateUserRequest,
};
