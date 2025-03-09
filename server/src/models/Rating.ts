import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';
import User from './User.ts';
import { RatingAttributes } from './modelsInterfaces.ts';

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> {}

class Rating
  extends Model<RatingAttributes, RatingCreationAttributes>
  implements RatingAttributes
{
  public id!: string;
  public bookId!: number;
  public userId!: string;
  public reviewHelpfulness!: string;
  public reviewScore!: string;
  public reviewSummary!: string;
  public reviewText!: string;
}

Rating.init(
  {
    id: {
      type: DataTypes.STRING(26),
      primaryKey: true,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    userId: {
      type: DataTypes.STRING(26),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    reviewHelpfulness: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reviewScore: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    reviewSummary: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['bookId'],
      },
      {
        unique: false,
        fields: ['userId'],
      },
      {
        unique: false,
        fields: ['reviewScore'],
      },
    ],
  }
);

export default Rating;
