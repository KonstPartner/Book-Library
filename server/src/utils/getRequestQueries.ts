import { Request } from 'express';
import { Op, WhereOptions } from 'sequelize';

type DefaultQueriesType = {
  defaultLimit?: number;
  defaultOffset?: number;
};

const getSearchQueries = (req: Request, searchableFields: string[]) => {
  const whereClause: WhereOptions = {};
  for (const field of searchableFields) {
    if (req.query[field]) {
      whereClause[field] = { [Op.iLike]: `%${req.query[field]}%` };
    }
  }
  return whereClause;
};

const getSubSearchQuery = (query: any, field: string) => {
  if (query) {
    return {
      [field]: { [Op.iLike]: `%${query}%` },
    };
  }
  return undefined;
};

const getBooksQueries = (req: Request) => {
  const searchableFields = [
    'title',
    'description',
    'author',
    'publisher',
    'publishedDate',
  ];
  return getSearchQueries(req, searchableFields);
};

const getRatingsQueries = (req: Request) => {
  const searchableFields = [
    'reviewHelpfulness',
    'reviewScore',
    'reviewSummary',
    'reviewText',
  ];
  return getSearchQueries(req, searchableFields);
};

export default (req: Request, defaultQueries: DefaultQueriesType = {}) => {
  const { defaultLimit = 5, defaultOffset = 0 } = defaultQueries;

  const limit = Number(req.query.limit) || defaultLimit;
  const offset = Number(req.query.offset) || defaultOffset;

  return {
    limit,
    offset,
    searchBooksQueries: getBooksQueries(req),
    searchRatingsQueries: getRatingsQueries(req),
    searchQueryName: getSearchQueries(req, ['name']),
    searchBooksCategoryQuery: getSubSearchQuery(req.query.category, 'name'),
    searchRatingsUserQuery: getSubSearchQuery(req.query.user, 'name'),
    searchRatingsBookQuery: getSubSearchQuery(req.query.book, 'title'),
  };
};
