import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface BookAttributes {
  id: number;
  title: string;
  description: string | null;
  author: string | null;
  image: string | null;
  publisher: string | null;
  publishedDate: string | null;
  infoLink: string | null;
}

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
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    infoLink: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false,
  }
);

export default Book;
