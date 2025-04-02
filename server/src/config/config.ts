import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'please-set-a-secret-in-env',
  jwtExpiresIn: '1h',
  refreshExpiresIn: '7d',
};

const holdCacheTime = {
  books: 3600,
  users: 10800,
  categories: 86400,
}

export { PORT, authConfig, holdCacheTime };
