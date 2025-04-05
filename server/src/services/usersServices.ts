import { WhereOptions } from 'sequelize';
import { ulid } from 'ulid';
import sequelize from '../config/database.js';
import User from '../models/User.js';
import { UserAttributes } from '../models/modelsInterfaces.js';
import { existingUser } from './servicesUtils.js';
import { Request } from 'express';

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

const createUserRequest = async (data: UserAttributes) => {
  await existingUser(data.name);

  const newUser = await User.create({
    id: ulid(),
    name: data.name,
  });

  return await findByPkUserRequest(String(newUser.id));
};

const destroyUserRequest = async (req: Request, userId: string) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { code: 404, message: `Error: No such user with id ${userId}` };
  }

  if (user.id !== (req as any).user.id) {
    throw { code: 403, message: 'You can only delete your own account.' };
  }

  return await User.destroy({ where: { id: userId } });
};

const updateUserRequest = async (
  req: Request,
  data: Partial<UserAttributes>
) => {
  const { id, ...updates } = data;

  const user = await User.findByPk(id);
  if (!user) {
    throw { code: 404, message: `Error: No such user with id ${id}` };
  }

  if (user.id !== (req as any).user.id) {
    throw { code: 403, message: 'You can only update your own account.' };
  }

  if (updates.name && updates.name !== user.name) {
    await existingUser(updates.name);
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
