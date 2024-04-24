import express from "express";

import baseRouter from "./tactics/base.js";
import cacheRouter from "./tactics/cache.js";
import rateLimitingRouter from "./tactics/rate-limiting.js";

const app = express();

app.use("/base", baseRouter);
app.use("/cache", cacheRouter);
app.use("/rate-limiting", rateLimitingRouter);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
