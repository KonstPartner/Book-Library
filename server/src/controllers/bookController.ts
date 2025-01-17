import { Request, Response } from 'express';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import Rating from '../models/Rating.ts';
import User from '../models/User.ts';

type RatingType = {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user?: { name: string } | null;
};

type BookWithOptionalCategoryAndRatingsType = Book & {
  category?: { name: string };
  ratings?: Array<Rating & RatingType>;
};

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

    const modifiedBooks = books.map(
      (book: BookWithOptionalCategoryAndRatingsType) => ({
        ...book.toJSON(),
        category: book.category ? book.category.name : null,
      })
    );

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

const getBookById = async (req: Request, res: Response) => {
  const BookId = req.params.id;

  try {
    const book: BookWithOptionalCategoryAndRatingsType | null =
      await Book.findByPk(BookId, {
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
          {
            model: Rating,
            as: 'ratings',
            limit: 5,
            attributes: [
              'reviewHelpfulness',
              'reviewScore',
              'reviewSummary',
              'reviewText',
            ],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['name'],
              },
            ],
          },
        ],
        attributes: { exclude: ['categoryId'] },
      });

    if (!book) {
      res.status(400).json({
        success: false,
        message: `Invalid book ID ${BookId}: no such book`,
      });
      return;
    }

    const modifiedBook = {
      ...book.toJSON(),
      category: book.category ? book.category.name : null,
      ratings: book.ratings
        ? book.ratings.map((rating) => ({
            ...rating.toJSON(),
            user: rating.user ? rating.user.name : null,
          }))
        : [],
    };

    res.status(200).json({ success: true, data: modifiedBook });
  } catch (error) {
    console.error(`Error fetching book ${BookId}:`, error);

    res.status(500).json({
      success: false,
      message: `Failed to fetch book ${BookId}.`,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { getAllBooks, getBookById };
