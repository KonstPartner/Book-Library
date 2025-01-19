import { Request, Response } from 'express';
import getRequestQueries from '../utils/getRequestQueries.ts';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../utils/handleResponse.ts';
import {
  findAllCategoriesRequest,
  findByPkCategoryRequest,
} from '../requests/categoryTable.ts';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = getRequestQueries(req, { defaultLimit: 25 });
    const categories = await findAllCategoriesRequest(limit, offset);
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

export { getAllCategories, getCategoryById };
