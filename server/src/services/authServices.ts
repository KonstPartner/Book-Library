import { ulid } from 'ulid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import { existingUser } from './servicesUtils.ts';
import RegisteredUser from '../models/RegisteredUser.ts';
import { authConfig } from '../config/config.ts';
import generateJWT from '../utils/generateJWT.ts';

const authError = { code: 401, message: 'Invalid name or password.' };

const createRegisteredUserRequest = async (name: string, password: string) => {
  await existingUser(name);

  const newUser = await User.create({
    id: ulid(),
    name,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await RegisteredUser.create({
    id: ulid(),
    users_id: newUser.id,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateJWT(newUser);

  return { user: newUser, accessToken, refreshToken };
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

  const { accessToken, refreshToken } = generateJWT(user);

  return { accessToken, refreshToken, user: { id: user.id, name: user.name } };
};

const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, authConfig.jwtSecret) as {
      id: string;
    };

    const newAccessToken = jwt.sign({ id: decoded.id }, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });

    const newRefreshToken = jwt.sign({ id: decoded.id }, authConfig.jwtSecret, {
      expiresIn: authConfig.refreshExpiresIn,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch {
    throw { code: 401, message: 'Invalid or expired refresh token.' };
  }
};

const changePasswordRequest = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const registeredUser = await RegisteredUser.findOne({
    where: { users_id: userId },
  });
  if (!registeredUser) {
    throw { code: 404, message: 'User not found.' };
  }

  const isMatch = await bcrypt.compare(oldPassword, registeredUser.password);
  if (!isMatch) {
    throw { code: 400, message: 'Incorrect old password.' };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await registeredUser.update({ password: hashedNewPassword });
};

export {
  createRegisteredUserRequest,
  loginUserRequest,
  refreshTokenRequest,
  changePasswordRequest,
};
