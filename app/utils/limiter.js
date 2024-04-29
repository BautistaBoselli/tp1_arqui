import { rateLimit } from "express-rate-limit";

export const limiter = (limit) => {
  return rateLimit({
    windowMs: 10 * 1000,
    limit: limit ?? 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
