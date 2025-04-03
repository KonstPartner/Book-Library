import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';
import { RegisteredUserAttributes } from './modelsInterfaces.js';

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface RegisteredUserCreationAttributes
  extends Optional<RegisteredUserAttributes, 'id'> {}

class RegisteredUser
  extends Model<RegisteredUserAttributes, RegisteredUserCreationAttributes>
  implements RegisteredUserAttributes
{
  public id!: string;
  public users_id!: string;
  public password!: string;
}

RegisteredUser.init(
  {
    id: {
      type: DataTypes.STRING(26),
      primaryKey: true,
      allowNull: false,
    },
    users_id: {
      type: DataTypes.STRING(26),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RegisteredUser',
    tableName: 'registered_users',
    timestamps: false,
    indexes: [
      {
        fields: ['users_id'],
      },
    ],
  }
);

export default RegisteredUser;
