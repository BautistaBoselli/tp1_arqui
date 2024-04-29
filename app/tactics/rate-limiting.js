import { Router } from "express";
import { getDictionary } from "../servicies/dictionary.js";
import { getQuotes } from "../servicies/quotes.js";
import { getSpaceflightNews } from "../servicies/spaceflight.js";
import { measureExecution } from "../utils/metrics.js";
import { limiter } from "../utils/limiter.js";

const base = Router();

base.get("/ping", limiter(800), (req, res) => {
  measureExecution("complete_time", async () => {
    res.send("Pong!");
  });
});

base.get("/dictionary", (req, res) => {
  measureExecution("complete_time", async () => {
    const word = req.query.word;

    try {
      const wordInfo = await getDictionary(word);
      res.json(wordInfo);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });
});

base.get("/spaceflight_news", (req, res) => {
  measureExecution("complete_time", async () => {
    try {
      const titles = await getSpaceflightNews();
      res.json(titles);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });
});

base.get("/quote", (req, res) => {
  measureExecution("complete_time", async () => {
    try {
      const [quote] = await getQuotes();
      res.json(quote);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  });
});

export default base;
