import { body, param, query } from 'express-validator';

const limitRule = [
  query('limit')
    .optional()
    .trim()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be an integer between 1 and 50.'),
];

const offsetRule = [
  query('offset')
    .optional()
    .trim()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer.'),
];

const idIntRule = [
  param('id')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Id must be a non-negative integer.'),
];

const idStringRule = [
  param('id')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Id must be between 1 and 255 characters long.'),
];

const ratingIdRule = [
  param('ratingId')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Rating id must be a non-negative integer.'),
];

const booksSearchQueriesRules = [
  query('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters long.'),
  query('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters long.'),
  query('author')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author name must be between 1 and 100 characters long.'),
  query('publisher')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Publisher name must be between 1 and 100 characters long.'),
  query('publishedDate')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Published date must be a between 1 and 50 characters long.'),
  query('category')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be between 1 and 100 characters long.'),
];

const createBookRules = [
  body('title')
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Title is required and cannot be empty.'),
  body('description')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Description is required.'),
  body('author')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Author is required.'),
  body('image')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Image is required.'),
  body('publisher')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Publisher is required.'),
  body('publishedDate')
    .isString()
    .exists({ checkNull: true })
    .withMessage('PublishedDate is required.'),
  body('infoLink')
    .isString()
    .exists({ checkNull: true })
    .withMessage('InfoLink is required.'),
  body('category')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Category is required and cannot be empty.'),
];

export {
  limitRule,
  offsetRule,
  idIntRule,
  idStringRule,
  ratingIdRule,
  booksSearchQueriesRules,
  createBookRules,
};
