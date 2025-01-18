import { Request } from "express";

export default (req: Request) => {
  const limit = Number(req.query.limit) || 5;
  const offset = Number(req.query.offset) || 0;
  return { limit, offset };
};
