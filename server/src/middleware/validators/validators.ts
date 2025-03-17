import {
  booksSearchQueriesRules,
  createBookRules,
  createRatingRules,
  createRegisterUserRules,
  createUserRules,
  idIntRule,
  idStringRule,
  limitRule,
  offsetRule,
  patchBookRules,
  patchRatingRules,
  patchUserRules,
  postCategoryRule,
  ratingIdRule,
  ratingsSearchQueriesRules,
  refreshTokenRule,
} from './validationRules.ts';

const validateLimit = limitRule;
const validateLimitAndOffset = [...limitRule, ...offsetRule];

const validateIdInt = idIntRule;
const validateIdString = idStringRule;
const validateIdIntAndRatingId = [...idIntRule, ...ratingIdRule];
const validateRefreshToken = refreshTokenRule;

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

const validatePostBook = [...createBookRules, ...idStringRule];
const validatePostRating = createRatingRules;
const validatePostUser = createUserRules;
const validateAuthUser = [...createUserRules, ...createRegisterUserRules];
const validatePostCategory = postCategoryRule;

const validatePatchBook = [...patchBookRules, ...idIntRule];
const validatePatchRating = [...patchRatingRules, ...idStringRule];
const validatePatchUser = [...patchUserRules, ...idStringRule];

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
  validatePatchBook,
  validatePatchRating,
  validatePatchUser,
  validateAuthUser,
  validateRefreshToken,
};
