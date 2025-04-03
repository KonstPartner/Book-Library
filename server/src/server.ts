import app from './app.js';
import { PORT } from './config/config.js';
import sequelize from './config/database.js';
import setupAssociations from './models/modelsAssociations.js';
import redis from './config/redis.js';

const startServer = async () => {
  try {
    await sequelize.sync();
    setupAssociations();
    console.log('Database synced successfully');

    try {
      await redis.ping();
      console.log('Redis connected successfully');
    } catch (redisError) {
      console.error('Redis connection failed:', redisError);
    }

    app.listen(PORT, () => {
      console.log(`Library API is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
    process.exit(1);
  }
};

startServer();
