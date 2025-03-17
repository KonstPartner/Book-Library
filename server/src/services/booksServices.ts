import { WhereOptions } from 'sequelize';
import { Request } from 'express';
import sequelize from '../config/database.ts';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import {
  BookAttributes,
  CategoryAttributes,
} from '../models/modelsInterfaces.ts';

const findAllBooksRequest = async (
  limit: number,
  offset: number,
  sortBooksBy: string | undefined,
  sortOrder: string,
  searchQueries: WhereOptions<BookAttributes> | undefined,
  searchCategoryQuery: WhereOptions<CategoryAttributes> | undefined
) =>
  await Book.findAndCountAll({
    limit,
    offset,
    order: [[sortBooksBy || 'title', sortOrder]],
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
  req: Request,
  data: BookAttributes & { category: string | null }
) => {
  const existinBook = await Book.findOne({ where: { title: data.title } });
  if (existinBook) {
    throw { code: 400, message: 'Book already exists.' };
  }

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
        userId: (req as any).user.id,
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

const destroyBookRequest = async (req: Request, bookId: string) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw { code: 404, message: `Error: No such book with id ${bookId}` };
  }

  if (book.userId !== (req as any).user.id) {
    throw { code: 403, message: 'You can only delete your own books.' };
  }

  return await Book.destroy({ where: { id: bookId } });
};

const updateBookRequest = async (
  req: Request,
  data: Partial<BookAttributes> & { category?: string }
) => {
  const { id, category, ...updates } = data;

  const book = await Book.findByPk(id);
  if (!book) {
    throw { code: 404, message: `Error: No such book with id ${id}` };
  }

  if (book.userId !== (req as any).user.id) {
    throw { code: 403, message: 'You can only update your own books.' };
  }

  if (updates.title) {
    const existinTitle = await Book.findOne({
      where: { title: updates.title },
    });

    if (existinTitle) {
      throw { code: 400, message: 'Title already used in another book.' };
    }
  }

  const transaction = await sequelize.transaction();
  try {
    Object.assign(book, updates);

    if (category) {
      const [createdCategory] = await Category.findOrCreate({
        where: { name: category },
        transaction,
      });
      book.categoryId = createdCategory.id;
    }

    await book.save({ transaction });
    await transaction.commit();
    return book;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export {
  findAllBooksRequest,
  findByPkBookRequest,
  findRandomBooksRequest,
  createBookRequest,
  destroyBookRequest,
  updateBookRequest,
};
