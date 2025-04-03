import { param, query } from 'express-validator';
import {
  createStringValidation,
  createIntParamValidation,
  createIntQueryValidation,
} from '../../utils/validationHelpers.js';

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
  query('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be a string between 1 and 255 characters long.'),

  query('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      'Description must be a string between 1 and 500 characters long.'
    ),

  query('author')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Author name must be a string between 1 and 100 characters long.'
    ),

  query('publisher')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Publisher name must be a string between 1 and 100 characters long.'
    ),

  query('publishedDate')
    .optional()
    .isString()
    .trim()
    .matches(/^\d{3,4}(-\d{2})?(-\d{2})?$/)
    .withMessage(
      'Published date must be in the format YYYY, YYYY-MM, or YYYY-MM-DD.'
    ),

  query('category')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Category must be a string between 1 and 100 characters long.'
    ),
];

const ratingsSearchQueriesRules = [
  query('reviewHelpfulness')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Review helpfulness must be a string between 1 and 255 characters long.'
    ),

  query('reviewScore')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Review score must be a string between 1 and 255 characters long.'
    ),

  query('reviewSummary')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      'Review summary must be a string between 1 and 255 characters long.'
    ),

  query('reviewText')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      'Review text must be a string between 1 and 500 characters long.'
    ),
];

const createBookRules = [
  createStringValidation(
    'title',
    1,
    255,
    'Title is required and must be between 2 and 100 characters long.'
  ),
  createStringValidation('description', 2, 500, 'Description is required.'),
  createStringValidation(
    'author',
    2,
    100,
    'Author is required and must be between 2 and 100 characters long.'
  ),
  createStringValidation(
    'image',
    2,
    255,
    'Image is required and must be between 2 and 255 characters long.'
  ),
  createStringValidation(
    'publisher',
    2,
    100,
    'Publisher is required and must be between 2 and 100 characters long.'
  ),
  createStringValidation(
    'publishedDate',
    2,
    50,
    'PublishedDate is required and must be between 2 and 50 characters long.'
  ),
  createStringValidation(
    'infoLink',
    2,
    255,
    'InfoLink is required and must be between 2 and 255 characters long.'
  ),
  createStringValidation(
    'category',
    1,
    100,
    'Category is required and cannot be empty and must be between 1 and 100 characters long.'
  ),
];

const createRatingRules = [
  createIntParamValidation('bookId', 1),
  createStringValidation(
    'reviewHelpfulness',
    1,
    255,
    'reviewHelpfulness is required.'
  ),
  createStringValidation(
    'reviewScore',
    1,
    3,
    'reviewScore is required and must be between 1 and 3 characters long.'
  ),
  createStringValidation(
    'reviewSummary',
    1,
    255,
    'reviewSummary is required and must be between 1 and 255 characters long.'
  ),
  createStringValidation(
    'reviewText',
    1,
    500,
    'reviewText is required and must be between 1 and 500 characters long.'
  ),
];

const createUserRules = [
  createStringValidation('name', 2, 50)
    .matches(/^[A-Za-z0-9]+(?:[_@ -][A-Za-z0-9]+)*$/)
    .withMessage(
      'Name can only contain letters, spaces, _, @, -, and cannot have multiple special characters in a row.'
    ),
];

const createRegisterUserRules = [
  createStringValidation(
    'password',
    6,
    50,
    'Password is required and must be between 6 and 50 characters long'
  ),
];

const refreshTokenRule = [
  createStringValidation('refreshToken', 1, 1000, 'Refresh token is required'),
];

const postCategoryRule = [
  createStringValidation(
    'name',
    1,
    100,
    'Name is required and must be between 1 and 100 characters long.'
  ),
];

const changePasswordRules = [
  createStringValidation('oldPassword', 6, 50, 'Old password is required'),
  createStringValidation(
    'newPassword',
    6,
    50,
    'New password must be at least 6 characters long'
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
  createRegisterUserRules,
  refreshTokenRule,
  changePasswordRules,
};
