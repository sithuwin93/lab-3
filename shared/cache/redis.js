// @flow
import Redis from 'ioredis';

export const config =
  process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
    ? {
        port: process.env.REDIS_CACHE_PORT,
        host: process.env.REDIS_CACHE_URL,
        password: process.env.REDIS_CACHE_PASSWORD,
      }
    // : undefined;
    :    
      {
        port: "6379",
        host: "127.0.0.1",
        password: process.env.REDIS_PASSWORD,
      }
export default new Redis(config);
