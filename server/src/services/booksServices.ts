import { WhereOptions } from 'sequelize';
import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import Rating from '../models/Rating.ts';
import User from '../models/User.ts';
import {
  BookAttributes,
  CategoryAttributes,
  RatingAttributes,
  UserAttributes,
} from '../models/modelsInterfaces.ts';

const findAllBooksRequest = async (
  limit: number,
  offset: number,
  searchQueries: WhereOptions<BookAttributes> | undefined,
  searchCategoryQuery: WhereOptions<CategoryAttributes> | undefined
) =>
  await Book.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    where: searchQueries,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
        where: searchCategoryQuery,
      },
    ],
    attributes: { exclude: ['categoryId'] },
  });

const findByPkBookRequest = async (BookId: string) =>
  await Book.findByPk(BookId, {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    ],
    attributes: {
      exclude: ['categoryId'],
      include: [
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM ratings AS rating
            WHERE rating."bookId" = "Book"."id"
          )`),
          'ratingsCount',
        ],
      ],
    },
  });

const findAllBookRatingsRequest = async (
  BookId: string,
  limit: number,
  offset: number,
  searchQueries: WhereOptions<RatingAttributes> | undefined,
  searchUserQuery: WhereOptions<UserAttributes> | undefined
) =>
  await Rating.findAll({
    where: { ...{ ...searchQueries, bookId: BookId } },
    limit,
    offset,
    order: [['id', 'ASC']],
    attributes: { exclude: ['bookId', 'userId'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name'],
        where: searchUserQuery,
      },
    ],
  });

const findByPkBookRatingRequest = async (RatingId: string) =>
  await Rating.findByPk(RatingId, {
    attributes: { exclude: ['bookId', 'userId'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    ],
  });

const findRandomBooksRequest = async (limit: number, offset: number) =>
  await Book.findAll({
    limit,
    offset,
    order: sequelize.random(),
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    ],
    attributes: { exclude: ['categoryId'] },
  });

const createBookRequest = async (
  data: BookAttributes & { category: string | null }
) => {
  const transaction = await sequelize.transaction();
  try {
    let categoryRecord;
    if (data.category) {
      [categoryRecord] = await Category.findOrCreate({
        where: { name: data.category },
        transaction,
      });
    }

    const newBook = await Book.create(
      {
        title: data.title,
        description: data.description || null,
        author: data.author || null,
        image: data.image || null,
        publisher: data.publisher || null,
        publishedDate: data.publishedDate || null,
        infoLink: data.infoLink || null,
        categoryId: categoryRecord ? categoryRecord.id : null,
      },
      { transaction }
    );
    await transaction.commit();

    return await findByPkBookRequest(String(newBook.id));
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export {
  findAllBooksRequest,
  findByPkBookRequest,
  findAllBookRatingsRequest,
  findByPkBookRatingRequest,
  findRandomBooksRequest,
  createBookRequest,
};
