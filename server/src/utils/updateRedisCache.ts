import { Request } from 'express';
import redis from '../config/redis.js';

const updateRedisCache = async (
  req: Request,
  cachedData: string,
  cacheKey: string
) => {
  const data = JSON.parse(cachedData);
  const updatedData = { ...data, ...req.body };
  const ttl = await redis.ttl(cacheKey);
  await redis.set(
    cacheKey,
    JSON.stringify(updatedData),
    'EX',
    ttl > 0 ? ttl : 3600
  );
};

export default updateRedisCache;
