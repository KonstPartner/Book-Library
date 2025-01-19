import Category from '../models/Category.ts';

const findAllCategoriesRequest = async (limit: number, offset: number) =>
  await Category.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
  });

const findByPkCategoryRequest = async (CategoryId: string) =>
  await Category.findByPk(CategoryId);

export { findAllCategoriesRequest, findByPkCategoryRequest };
