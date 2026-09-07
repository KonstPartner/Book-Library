import { NextFunction, Request, Response } from 'express';
import redis from '../config/redis.js';

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 30;

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  return req.ip || req.socket.remoteAddress || 'unknown';
};

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  const key = `rate-limit:${getClientIp(req)}`;

  try {
    const requestCount = await redis.incr(key);

    if (requestCount === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }

    if (requestCount > RATE_LIMIT_MAX_REQUESTS) {
      res.setHeader('Retry-After', RATE_LIMIT_WINDOW_SECONDS);
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next();
  }
};

export default rateLimiter;
