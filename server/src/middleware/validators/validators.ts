import {
  booksSearchQueriesRules,
  idIntRule,
  idStringRule,
  limitAndOffsetRules,
  ratingIdRule,
} from './validationRules.ts';

const validateLimitAndOffset = [...limitAndOffsetRules];

const validateIdInt = [...idIntRule];

const validateIdString = [...idStringRule];

const validateIdIntAndRatingId = [...idIntRule, ...ratingIdRule];

const validateIdStringAndRatingId = [...idStringRule, ...ratingIdRule];

const validateGetAllBooks = [
  ...limitAndOffsetRules,
  ...booksSearchQueriesRules,
];

export {
  validateLimitAndOffset,
  validateIdIntAndRatingId,
  validateIdStringAndRatingId,
  validateIdInt,
  validateIdString,
  validateGetAllBooks,
};
