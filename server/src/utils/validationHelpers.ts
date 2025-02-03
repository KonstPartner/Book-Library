import { body, param, query } from 'express-validator';

export const createStringValidation = (
  field: string,
  min: number,
  max: number,
  message?: string
) => {
  return body(field)
    .isString()
    .trim()
    .isLength({ min, max })
    .withMessage(
      message || `${field} must be between ${min} and ${max} characters long.`
    );
};

export const createIntParamValidation = (field: string, min: number) => {
  return param(field)
    .trim()
    .isInt({ min })
    .withMessage(
      `${field} must be an integer greater than or equal to ${min}.`
    );
};

export const createIntQueryValidation = (
  field: string,
  min: number,
  max?: number
) => {
  const rule = query(field).optional().trim().isInt({ min });
  return max
    ? rule
        .isInt({ max })
        .withMessage(`${field} must be between ${min} and ${max}.`)
    : rule;
};
