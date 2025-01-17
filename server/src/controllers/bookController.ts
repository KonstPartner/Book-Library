import { Request, Response } from 'express';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';

type BookWithCategoryType = Book & { category?: { name: string } };

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const offset = Number(req.query.offset) || 0;

    const books = await Book.findAll({
      limit,
      offset,
      order: [['id', 'ASC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
      attributes: { exclude: ['categoryId'] },
    });

    const modifiedBooks = books.map((book: BookWithCategoryType) => ({
      ...book.toJSON(),
      category: book.category ? book.category.name : null,
    }));

    res.status(200).json({ success: true, data: modifiedBooks });
  } catch (error) {
    console.error('Error fetching books:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch books.',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { getAllBooks };
