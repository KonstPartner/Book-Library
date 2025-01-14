import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface UserAttributes {
  id: string;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;