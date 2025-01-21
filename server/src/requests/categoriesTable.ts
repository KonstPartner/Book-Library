import { WhereOptions } from 'sequelize';
import Category from '../models/Category.ts';
import { CategoryAttributes } from '../models/modelsInterfaces.ts';

const findAllCategoriesRequest = async (
  limit: number,
  offset: number,
  searchQueries: WhereOptions<CategoryAttributes> | undefined
) =>
  await Category.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    where: searchQueries,
  });

const findByPkCategoryRequest = async (CategoryId: string) =>
  await Category.findByPk(CategoryId);

export { findAllCategoriesRequest, findByPkCategoryRequest };
