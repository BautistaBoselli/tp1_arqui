import express from "express";

import baseRouter from "./tactics/base.js";
import cacheRouter from "./tactics/cache.js";
import rateLimitingRouter from "./tactics/rate-limiting.js";

const app = express();

app.use("/", baseRouter);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
