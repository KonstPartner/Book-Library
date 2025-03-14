import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'please-set-a-secret-in-env',
  jwtExpiresIn: '1h',
  refreshExpiresIn: '7d',
};

export { PORT, authConfig };
