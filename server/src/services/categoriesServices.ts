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
    order: [['name', 'ASC']],
    where: searchQueries,
  });

const findByPkCategoryRequest = async (CategoryId: string) =>
  await Category.findByPk(CategoryId);

const createCategoryRequest = async (data: CategoryAttributes) => {
  const existinCategory = await Category.findOne({ where: { name: data.name } });
  if (existinCategory) {
    throw {
      code: 400,
      message: 'Category already exists.',
    };
  }

  const newCategory = await Category.create({
    name: data.name,
  });
  return await findByPkCategoryRequest(String(newCategory.id));
};

const destroyCategoryRequest = async (CategoryId: string) => {
  const category = await Category.findByPk(CategoryId);
  if (!category) {
    throw {
      code: 404,
      message: `Error: No such category with id ${CategoryId}`,
    };
  }
  return await Category.destroy({ where: { id: CategoryId } });
};

export {
  findAllCategoriesRequest,
  findByPkCategoryRequest,
  createCategoryRequest,
  destroyCategoryRequest,
};
