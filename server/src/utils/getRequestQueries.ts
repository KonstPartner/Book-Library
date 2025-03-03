import { Request } from 'express';
import { Op, WhereOptions } from 'sequelize';

type DefaultQueriesType = {
  defaultLimit?: number;
  defaultOffset?: number;
};

const getSearchQueries = (
  req: Request,
  searchableFields: string[]
): WhereOptions => {
  const whereClause: WhereOptions = {};

  const exactFields = (req.query.exact as string)?.split(',') || [];

  for (const field of searchableFields) {
    if (req.query[field]) {
      const value = req.query[field] as string;
      const isExact = exactFields.includes(field);
      whereClause[field] = isExact
        ? { [Op.iLike]: value }
        : { [Op.iLike]: `%${value}%` };
    }
  }
  return whereClause;
};

const getSubSearchQuery = (
  query: any,
  field: string,
  exactFields: string[] = []
) => {
  const fieldMapping: { [key: string]: string } = {
    category: 'name',
    user: 'name',
    book: 'title',
  };

  const modifiedExactFields = new Set(
    exactFields.map((inputField) => fieldMapping[inputField] || inputField)
  );

  if (query) {
    const isExact = modifiedExactFields.has(field);
    return isExact
      ? { [field]: { [Op.iLike]: query } }
      : { [field]: { [Op.iLike]: `%${query}%` } };
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
  const exactFields = (req.query.exact as string)?.split(',') || [];

  return {
    limit,
    offset,
    searchBooksQueries: getBooksQueries(req),
    searchRatingsQueries: getRatingsQueries(req),
    searchQueryName: getSearchQueries(req, ['name']),
    searchBooksCategoryQuery: getSubSearchQuery(
      req.query.category,
      'name',
      exactFields
    ),
    searchRatingsUserQuery: getSubSearchQuery(
      req.query.user,
      'name',
      exactFields
    ),
    searchRatingsBookQuery: getSubSearchQuery(
      req.query.book,
      'title',
      exactFields
    ),
  };
};
