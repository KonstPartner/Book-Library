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
    .isLength({ min: 26, max: 26 })
    .withMessage('Id must be between 26 characters long.'),
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

const ratingsSearchQueriesRules = [
  query('reviewHelpfulness')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'reviewHelpfulness must be between 1 and 255 characters long.'
    ),
  query('reviewScore')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('reviewScore must be between 1 and 255 characters long.'),
  query('reviewSummary')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'reviewSummary name must be between 1 and 255 characters long.'
    ),
  query('reviewScore')
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('reviewScore name must be between 1 and 500 characters long.'),
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

const createRatingRules = [
  body('bookId')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Book id must be a non-negative integer.'),
  body('userId')
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('userId is required and cannot be empty.'),
  body('reviewHelpfulness')
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('reviewHelpfulness is required and cannot be empty.'),
  body('reviewScore')
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('reviewScore is required and cannot be empty.'),
  body('reviewSummary')
    .isString()
    .exists({ checkNull: true })
    .withMessage('reviewSymmary is required.'),
  body('reviewText')
    .isString()
    .exists({ checkNull: true })
    .withMessage('reviewText is required.'),
];

const createUserRules = [
  body('name')
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('name is required and cannot be empty.')
    .matches(/^[A-Za-z0-9]+(?:[_@ -][A-Za-z0-9]+)*$/)
    .withMessage(
      'Name can only contain letters, spaces, _, @, -, and cannot have multiple special characters in a row. Minimum 2 letters are required.'
    )
    .isLength({ min: 2 })
    .withMessage('Name must contain at least 2 letters.'),
];

const postCategoryRule = [
  body('name')
    .isString()
    .exists({ checkNull: true })
    .withMessage('Name is required and cannot be empty.'),
];

const patchBookRules = [
  body('title')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Title cannot be empty if provided.'),
  body('description')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Description cannot be empty if provided.'),
  body('author')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Author cannot be empty if provided.'),
  body('image')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Image cannot be empty if provided.'),
  body('publisher')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Publisher cannot be empty if provided.'),
  body('publishedDate')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('PublishedDate cannot be empty if provided.'),
  body('infoLink')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('InfoLink cannot be empty if provided.'),
  body('category')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Category cannot be empty if provided.'),
];

const patchRatingRules = [
  body('reviewHelpfulness')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('reviewHelpfulness cannot be empty if provided.'),
  body('reviewScore')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('reviewScore cannot be empty if provided.'),
  body('reviewSummary')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('reviewSummary cannot be empty if provided.'),
  body('reviewText')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('reviewText cannot be empty if provided.'),
];

const patchUserRules = [
  body('name')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Name cannot be empty if provided.')
    .matches(/^[A-Za-z]+(?:[_@ -][A-Za-z]+)*$/)
    .withMessage(
      'Name can only contain letters, spaces, _, @, -, and cannot have multiple special characters in a row. Minimum 2 letters are required.'
    )
    .isLength({ min: 2 })
    .withMessage('Name must contain at least 2 letters.'),
];

export {
  limitRule,
  offsetRule,
  idIntRule,
  idStringRule,
  ratingIdRule,
  booksSearchQueriesRules,
  ratingsSearchQueriesRules,
  createBookRules,
  createRatingRules,
  createUserRules,
  postCategoryRule,
  patchBookRules,
  patchRatingRules,
  patchUserRules,
};
