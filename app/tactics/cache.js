import { Router } from "express";
import { getDictionary } from "../servicies/dictionary.js";
import { getQuotes } from "../servicies/quotes.js";
import { getSpaceflightNews } from "../servicies/spaceflight.js";
import { measureExecution } from "../utils/metrics.js";
import { redis } from "../utils/redis.js";

const base = Router();

base.get("/ping", (req, res) => {
  measureExecution("complete_time", async () => {
    res.send("Pong!");
  });
});

// This endpoint is only for resetting the Redis cache and testing its functionality, it is not used in the tests
base.get("/reset-cache", async (req, res) => {
  await redis.flushAll();
  res.json({ success: true });
});

base.get("/dictionary", (req, res) => {
  measureExecution("complete_time", async () => {
    const word = req.query.word;

    const cachedValue = await redis.get("dictionary/" + word);

    if (cachedValue) {
      res.json(JSON.parse(cachedValue));
      return;
    }

    try {
      const wordInfo = await getDictionary(word);
      await redis.set("dictionary/" + word, JSON.stringify(wordInfo));
      res.json(wordInfo);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });
});

// This value is in seconds
const TITLES_CACHE_EXPIRATION = 30;

base.get("/spaceflight_news", (req, res) => {
  measureExecution("complete_time", async () => {
    const cachedValue = await redis.get("spaceflight_news");

    if (cachedValue) {
      res.json(JSON.parse(cachedValue));
      return;
    }

    try {
      const titles = await getSpaceflightNews();
      await redis.set("spaceflight_news", JSON.stringify(titles), {
        EX: TITLES_CACHE_EXPIRATION,
      });
      res.json(titles);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });
});

const PRECACHED_QUOTES = 5;

base.get("/quote", (req, res) => {
  measureExecution("complete_time", async () => {
    let cachedQuotes = JSON.parse((await redis.get("quotes")) ?? "[]");

    // If there are no quotes in the cache, we fetch a new batch of quotes, if that fails we return an error
    if (cachedQuotes.length === 0) {
      try {
        cachedQuotes = await getQuotes(PRECACHED_QUOTES + 1);
      } catch (err) {
        res.status(err.statusCode).send(err.message);
      }
    }

    const quote = cachedQuotes.pop();
    await redis.set("quotes", JSON.stringify(cachedQuotes));
    res.json(quote);

    // If after returning a quote we run out of quotes, we fetch a new batch of quotes and store them in the cache
    if (cachedQuotes.length === 0) {
      try {
        cachedQuotes = await getQuotes(PRECACHED_QUOTES);
        await redis.set("quotes", JSON.stringify(cachedQuotes));
      } catch (err) {
        return;
      }
    }

    // We store the updated list of quotes in the cache for future requests
  });
});

export default base;
