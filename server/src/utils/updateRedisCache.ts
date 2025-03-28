import { Request } from 'express';
import redis from '../config/redis.ts';

const updateRedisCache = async (
  req: Request,
  cachedUser: string,
  cacheKey: string
) => {
  const userData = JSON.parse(cachedUser);
  const updatedUserData = { ...userData, ...req.body };
  const ttl = await redis.ttl(cacheKey);
  await redis.set(
    cacheKey,
    JSON.stringify(updatedUserData),
    'EX',
    ttl > 0 ? ttl : 3600
  );
};

export default updateRedisCache;
