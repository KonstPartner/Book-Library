import app from './app.ts';
import { PORT } from './config/config.ts';
import sequelize from './config/database.ts';
import setupAssociations from './models/modelsAssociations.ts';

const startServer = async () => {
  try {
    await sequelize.sync();
    setupAssociations();

    app.listen(PORT, () => {
      console.log(`Library API is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
    process.exit(1);
  }
};

startServer();
