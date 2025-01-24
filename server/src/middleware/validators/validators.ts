import {
  booksSearchQueriesRules,
  createBookRules,
  createRatingRules,
  createUserRules,
  idIntRule,
  idRule,
  idStringRule,
  limitRule,
  offsetRule,
  ratingIdRule,
} from './validationRules.ts';

const validateLimit = [...limitRule];

const validateLimitAndOffset = [...limitRule, ...offsetRule];

const validateIdInt = [...idIntRule];

const validateIdString = [...idStringRule];

const validateIdIntAndRatingId = [...idIntRule, ...ratingIdRule];

const validateIdStringAndRatingId = [...idStringRule, ...ratingIdRule];

const validateGetAllBooks = [
  ...limitRule,
  ...offsetRule,
  ...booksSearchQueriesRules,
];

const validatePostBook = [...createBookRules];

const validatePostRating = [...createRatingRules];

const validatePostUser = [...createUserRules];

const validateId = [...idRule];

export {
  validateLimit,
  validateLimitAndOffset,
  validateIdIntAndRatingId,
  validateIdStringAndRatingId,
  validateIdInt,
  validateIdString,
  validateGetAllBooks,
  validatePostBook,
  validatePostRating,
  validatePostUser,
  validateId,
};
