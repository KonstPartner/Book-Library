import { Request } from 'express';
import { Op, WhereOptions } from 'sequelize';

type DefaultQueriesType = {
  defaultLimit?: number;
  defaultOffset?: number;
};

const getSearchQueries = (req: Request) => {
  const searchableFields = [
    'title',
    'description',
    'author',
    'publisher',
    'publishedDate',
  ];
  const whereClause: WhereOptions = {};
  for (const field of searchableFields) {
    if (req.query[field]) {
      whereClause[field] = { [Op.iLike]: `%${req.query[field]}%` };
    }
  }
  return whereClause;
};

const getSearchCategoryQuery = (req: Request) => {
  if (req.query.category) {
    return {
      name: { [Op.iLike]: `%${req.query.category}%` },
    };
  }
  return undefined;
};

export default (req: Request, defaultQueries: DefaultQueriesType = {}) => {
  const { defaultLimit = 5, defaultOffset = 0 } = defaultQueries;

  const limit = Number(req.query.limit) || defaultLimit;
  const offset = Number(req.query.offset) || defaultOffset;

  const searchQueries = getSearchQueries(req);

  const searchCategoryQuery: WhereOptions | undefined =
    getSearchCategoryQuery(req);

  return { limit, offset, searchQueries, searchCategoryQuery };
};
