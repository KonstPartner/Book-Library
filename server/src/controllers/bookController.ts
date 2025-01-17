import Book from '../models/Book.ts';
import { Request, Response } from 'express';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({ limit: 50 });

    res.status(200).json({ success: true, data: books });
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
