import { param, query } from 'express-validator';
import {
  createStringValidation,
  createIntParamValidation,
  createIntQueryValidation,
} from '../../utils/validationHelpers.ts';

const limitRule = [createIntQueryValidation('limit', 1, 50)];
const offsetRule = [createIntQueryValidation('offset', 0)];

const idIntRule = [createIntParamValidation('id', 1)];
const idStringRule = [
  param('id')
    .isLength({ min: 26, max: 26 })
    .withMessage('Id must be exactly 26 characters long.'),
];

const ratingIdRule = [createIntParamValidation('ratingId', 1)];

const booksSearchQueriesRules = [
  query('title').optional().isString().trim().isLength({ min: 1, max: 255 }),
  query('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 }),
  query('author').optional().isString().trim().isLength({ min: 1, max: 100 }),
  query('publisher')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 }),
  query('publishedDate')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 }),
  query('category').optional().isString().trim().isLength({ min: 1, max: 100 }),
];

const ratingsSearchQueriesRules = [
  query('reviewHelpfulness')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 }),
  query('reviewScore')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 }),
  query('reviewSummary')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 }),
  query('reviewText')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 }),
];

const createBookRules = [
  createStringValidation(
    'title',
    1,
    255,
    'Title is required and cannot be empty.'
  ),
  createStringValidation('description', 1, 500, 'Description is required.'),
  createStringValidation('author', 1, 100, 'Author is required.'),
  createStringValidation('image', 1, 500, 'Image is required.'),
  createStringValidation('publisher', 1, 100, 'Publisher is required.'),
  createStringValidation('publishedDate', 1, 50, 'PublishedDate is required.'),
  createStringValidation('infoLink', 1, 500, 'InfoLink is required.'),
  createStringValidation(
    'category',
    1,
    100,
    'Category is required and cannot be empty.'
  ),
];

const createRatingRules = [
  createIntParamValidation('bookId', 1),
  createStringValidation(
    'userId',
    2,
    50,
    'userId is required and cannot be empty.'
  ),
  createStringValidation(
    'reviewHelpfulness',
    1,
    255,
    'reviewHelpfulness is required.'
  ),
  createStringValidation('reviewScore', 1, 255, 'reviewScore is required.'),
  createStringValidation('reviewSummary', 1, 255, 'reviewSummary is required.'),
  createStringValidation('reviewText', 1, 500, 'reviewText is required.'),
];

const createUserRules = [
  createStringValidation('name', 2, 50)
    .matches(/^[A-Za-z0-9]+(?:[_@ -][A-Za-z0-9]+)*$/)
    .withMessage(
      'Name can only contain letters, spaces, _, @, -, and cannot have multiple special characters in a row.'
    ),
];

const postCategoryRule = [
  createStringValidation(
    'name',
    1,
    100,
    'Name is required and cannot be empty.'
  ),
];

const patchBookRules = createBookRules.map((rule) => rule.optional());
const patchRatingRules = createRatingRules.map((rule) => rule.optional());
const patchUserRules = createUserRules.map((rule) => rule.optional());

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
