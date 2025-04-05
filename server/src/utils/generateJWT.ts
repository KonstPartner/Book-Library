import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authConfig } from '../config/config.js';

const generateJWT = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name },
    authConfig.jwtSecret,
    { expiresIn: authConfig.jwtExpiresIn }
  );
  const refreshToken = jwt.sign({ id: user.id }, authConfig.jwtSecret, {
    expiresIn: authConfig.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

export default generateJWT;
