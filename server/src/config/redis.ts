import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
  host: 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('connect', () => {
  console.log('Redis reconnected');
});

export default redis;
