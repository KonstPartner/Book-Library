import {
  booksSearchQueriesRules,
  idIntRule,
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

export {
  validateLimit,
  validateLimitAndOffset,
  validateIdIntAndRatingId,
  validateIdStringAndRatingId,
  validateIdInt,
  validateIdString,
  validateGetAllBooks,
};
