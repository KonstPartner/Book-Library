import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  destroyCategory,
  findAllCategoriesRequest,
  findByPkCategoryRequest,
} from '../services/categoriesServices.ts';

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

export { getAllCategories, getCategoryById, deleteCategoryById };
