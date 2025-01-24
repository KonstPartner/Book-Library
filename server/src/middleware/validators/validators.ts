import {
  booksSearchQueriesRules,
  createBookRules,
  createRatingRules,
  createUserRules,
  idIntRule,
  idStringRule,
  limitRule,
  offsetRule,
  postCategoryRule,
  ratingIdRule,
} from './validationRules.ts';

const validateLimit = [...limitRule];

const validateLimitAndOffset = [...limitRule, ...offsetRule];

const validateIdInt = [...idIntRule];

const validateIdString = [...idStringRule];

const validateIdIntAndRatingId = [...idIntRule, ...ratingIdRule];

const validateGetAllBooks = [
  ...limitRule,
  ...offsetRule,
  ...booksSearchQueriesRules,
];

const validatePostBook = [...createBookRules];

const validatePostRating = [...createRatingRules];

const validatePostUser = [...createUserRules];

const validatePostCategory = [...postCategoryRule];

export {
  validateLimit,
  validateLimitAndOffset,
  validateIdIntAndRatingId,
  validateIdInt,
  validateIdString,
  validateGetAllBooks,
  validatePostBook,
  validatePostRating,
  validatePostUser,
  validatePostCategory,
};
