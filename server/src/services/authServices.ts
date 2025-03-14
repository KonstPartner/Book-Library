import { ulid } from 'ulid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import { existingUser } from './servicesUtils.ts';
import RegisteredUser from '../models/RegisteredUser.ts';
import { authConfig } from '../config/config.ts';

const authError = { code: 401, message: 'Invalid name or password.' };

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

const loginUserRequest = async (name: string, password: string) => {
  const user = await User.findOne({ where: { name } });
  if (!user) {
    throw authError;
  }

  const registeredUser = await RegisteredUser.findOne({
    where: { users_id: user.id },
  });
  if (!registeredUser) {
    throw authError;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isPasswordValid) {
    throw authError;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name },
    authConfig.jwtSecret,
    { expiresIn: authConfig.jwtExpiresIn }
  );

  return { token, user: { id: user.id, name: user.name } };
};

export { createRegisteredUserRequest, loginUserRequest };
