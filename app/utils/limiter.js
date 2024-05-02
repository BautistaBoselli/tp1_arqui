import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "./redis.js";

export const limiter = (limit) => {
  return rateLimit({
    windowMs: 10 * 1000,
    limit: limit ?? 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args) => redis.sendCommand(args),
    }),
  });
};
