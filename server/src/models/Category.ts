import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/database.ts';

interface CategoryAttributes {
  id: number;
  name: string;
}

class Category
  extends Model<CategoryAttributes, 'id'>
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
