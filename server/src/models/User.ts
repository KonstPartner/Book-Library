import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';
import { UserAttributes } from './modelsInterfaces.ts';

/* eslint-disable @typescript-eslint/no-empty-object-type */
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
      type: DataTypes.STRING(26),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        fields: ['name'],
      },
    ],
  }
);

export default User;
