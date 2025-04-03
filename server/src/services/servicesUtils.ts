import User from '../models/User.js';

const existingUser = async (name: string) => {
  const existingUser = await User.findOne({ where: { name } });
  if (existingUser) {
    throw {
      code: 400,
      message: 'User already exists.',
    };
  }
};

export { existingUser };
