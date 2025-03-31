import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  createCategoryRequest,
  destroyCategoryRequest,
  findAllCategoriesRequest,
  findByPkCategoryRequest,
} from '../services/categoriesServices.ts';
import Category from '../models/Category.ts';
import simplifyWhereOptions from '../utils/simplifyWhereOptions.ts';
import redis from '../config/redis.ts';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { limit, offset, searchQueryName } = getRequestQueries(req, {
      defaultLimit: 50,
    });
    const cacheKey = `categories:${limit}:${offset}:${simplifyWhereOptions(searchQueryName, 'category')}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return handleSuccessResponse(res, JSON.parse(cachedData));
    }

    const categories = await findAllCategoriesRequest(
      limit,
      offset,
      searchQueryName
    );

    await redis.set(cacheKey, JSON.stringify(categories), 'EX', 3600);

    handleSuccessResponse(res, categories);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to fetch categories.',
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const CategoryId = req.params.id;
  try {
    const category = await findByPkCategoryRequest(CategoryId);
    if (!category) {
      handleErrorResponse({
        res,
        message: `Invalid category ID ${CategoryId}: no such category`,
        code: 404,
      });
      return;
    }
    handleSuccessResponse(res, category);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: `Failed to fetch category ${CategoryId}.`,
    });
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const newCategory: Category = (await createCategoryRequest(
      req.body
    )) as Category;
    handleSuccessResponse(res, newCategory);
  } catch (error) {
    handleErrorResponse({ res, error, message: 'Failed to create category.' });
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    await destroyCategoryRequest(req.params.id);
    handleSuccessResponse(res);
  } catch (error) {
    handleErrorResponse({
      res,
      error,
      message: 'Failed to delete category ' + req.params.id,
    });
  }
};

export { getAllCategories, getCategoryById, postCategory, deleteCategoryById };
