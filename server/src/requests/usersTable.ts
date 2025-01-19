import User from '../models/User.ts';

const findAllUsersRequest = async (limit: number, offset: number) =>
  await User.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
  });

const findByPkUserRequest = async (UserId: string) =>
  await User.findByPk(UserId);

export { findAllUsersRequest, findByPkUserRequest };
