import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database.js';
import { BookAttributes } from './modelsInterfaces.js';

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}
class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public description!: string | null;
  public author!: string | null;
  public image!: string | null;
  public publisher!: string | null;
  public publishedDate!: string | null;
  public infoLink!: string | null;
  public categoryId!: number | null;
  public userId!: string | null;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    publishedDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    infoLink: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    userId: {
      type: DataTypes.STRING(26),
      allowNull: true,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['title'],
      },
    ],
  }
);

export default Book;
