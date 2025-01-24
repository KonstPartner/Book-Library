import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  createCategoryRequest,
  destroyCategory,
  findAllCategoriesRequest,
  findByPkCategoryRequest,
} from '../services/categoriesServices.ts';
import Category from '../models/Category.ts';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { limit, offset, searchQueryName } = getRequestQueries(req, {
      defaultLimit: 25,
    });
    const categories = await findAllCategoriesRequest(
      limit,
      offset,
      searchQueryName
    );
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
    await destroyCategory(req.params.id);
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
