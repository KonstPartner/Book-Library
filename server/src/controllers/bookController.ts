import { Request, Response } from 'express';
import Book from '../models/Book.ts';
import Category from '../models/Category.ts';
import Rating from '../models/Rating.ts';
import User from '../models/User.ts';
import sequelize from '../config/database.ts';

type RatingsType = Array<Rating & RatingType>;

type RatingType = Rating & {
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user?: { name: string } | null;
};

type BookWithOptionalCategoryAndRatingsType = Book & {
  category?: { name: string };
  ratings?: RatingsType;
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

const getBookAllRatings = async (req: Request, res: Response) => {
  const BookId = req.params.id;
  const limit = Number(req.query.limit) || 5;
  const offset = Number(req.query.offset) || 0;
  try {
    const ratings: RatingsType = await Rating.findAll({
      where: { bookId: BookId },
      limit,
      offset,
      attributes: { exclude: ['bookId', 'userId'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!ratings.length) {
      res.status(404).json({
        success: false,
        message: `No ratings found for book ID ${BookId}`,
      });
      return;
    }

    const modifiedRatings = ratings.map((rating) => ({
      ...rating.toJSON(),
      user: rating.user ? rating.user.name : null,
    }));

    res.status(200).json({ success: true, data: modifiedRatings });
  } catch (error) {
    console.error(`Error fetching book ${BookId}:`, error);

    res.status(500).json({
      success: false,
      message: `Failed to fetch book ${BookId}.`,
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getBookRatingById = async (req: Request, res: Response) => {
  const RatingId = req.params.ratingId;
  try {
    const rating: RatingType | null = await Rating.findByPk(RatingId, {
      attributes: { exclude: ['bookId', 'userId'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!rating) {
      res.status(400).json({
        success: false,
        message: `Invalid rating ID ${RatingId}: no such rating`,
      });
      return;
    }

    const modifiedRating = {
      ...rating.toJSON(),
      user: rating.user ? rating.user.name : null,
    };

    res.status(200).json({ success: true, data: modifiedRating });
  } catch (error) {
    console.error(`Error fetching rating ${RatingId}:`, error);

    res.status(500).json({
      success: false,
      message: `Failed to fetch rating ${RatingId}.`,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { getAllBooks, getBookById, getBookAllRatings, getBookRatingById };
