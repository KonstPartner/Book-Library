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
  ratingsSearchQueriesRules,
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
const validateGetAllRatings = [
  ...limitRule,
  ...offsetRule,
  ...ratingsSearchQueriesRules,
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
  validateGetAllRatings,
  validatePostBook,
  validatePostRating,
  validatePostUser,
  validatePostCategory,
};
