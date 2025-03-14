import { ulid } from 'ulid';
import bcrypt from 'bcrypt';
import User from '../models/User.ts';
import { existingUser } from './servicesUtils.ts';
import RegisteredUser from '../models/RegisteredUser.ts';

const createRegisteredUserRequest = async (name: string, password: string) => {
  await existingUser(name);

  const newUser = await User.create({
    id: ulid(),
    name,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const registeredUser = await RegisteredUser.create({
    id: ulid(),
    users_id: newUser.id,
    password: hashedPassword,
  });

  return { user: newUser, registeredUser };
};

export { createRegisteredUserRequest };
