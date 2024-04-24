const express = require("express");

const baseRouter = require("./tactics/base");
const cacheRouter = require("./tactics/cache");
const rateLimitingRouter = require("./tactics/rate-limiting");

const app = express();

app.use("/base", baseRouter);
app.use("/cache", cacheRouter);
app.use("/rate-limiting", rateLimitingRouter);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
