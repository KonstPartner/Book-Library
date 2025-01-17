import sequelize from '../../config/database.ts';
import {
  importBookAndCategories,
  importRatings,
  importUsers,
} from './operations/importTables.ts';
import './logs/logger.ts';

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
