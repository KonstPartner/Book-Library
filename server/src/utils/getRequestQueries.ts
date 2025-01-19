import { Request } from 'express';

type DefaultQueriesType = {
  defaultLimit?: number;
  defaultOffset?: number;
};

export default (req: Request, defaultQueries: DefaultQueriesType = {}) => {
  const { defaultLimit = 5, defaultOffset = 0 } = defaultQueries;
  const limit = Number(req.query.limit) || defaultLimit;
  const offset = Number(req.query.offset) || defaultOffset;
  return { limit, offset };
};
