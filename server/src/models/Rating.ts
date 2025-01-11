import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface RatingAttributes {
  id: number;
  bookId: number;
  userId: string;
  userName: string;
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> {}

class Rating
  extends Model<RatingAttributes, RatingCreationAttributes>
  implements RatingAttributes
{
  public id!: number;
  public bookId!: number;
  public userId!: string;
  public userName!: string;
  public reviewHelpfulness!: string;
  public reviewScore!: string;
  public reviewSummary!: string;
  public reviewText!: string;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  }
);

export default Rating;
