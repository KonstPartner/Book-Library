import sequelize from '../../config/database.js';
import {
  importBookAndCategories,
  importRatings,
  importUsers,
} from './operations/importTables.js';
import './logs/logger.js';

export default async (table: 'books' | 'users' | 'ratings') => {
  switch (table) {
    case 'books':
      await sequelize.sync({ force: true });
      importBookAndCategories();
      break;
    case 'users':
      await sequelize.sync({ alter: true });
      importUsers();
      break;
    case 'ratings':
      await sequelize.sync({ alter: true });
      importRatings();
      break;
  }
};
