import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
    logging: false,
    pool: {
      //for seed import:
      max: 5, //Used 50
      min: 0, //Used 2
      acquire: 30000, //Used 60000
      idle: 10000, //Used 15000
    },
  }
);

export default sequelize;
