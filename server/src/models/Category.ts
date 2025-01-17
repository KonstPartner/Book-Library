import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface CategoryAttributes {
  id: number;
  name: string;
}

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
  }
);

export default Category;
