import sequelize from '../../config/database.ts';
import {
  importBookAndCategories,
  importRatings,
} from './operations/importTables.ts';

export default async (table: 'books' | 'ratings') => {
  if (table === 'books') {
    await sequelize.sync({ force: true });
    importBookAndCategories();
  } else {
    await sequelize.sync({ alter: true });
    importRatings();
  }
};
