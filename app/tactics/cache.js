import { Router } from "express";
import { getDictionary } from "../servicies/dictionary.js";
import { getSpaceflightNews } from "../servicies/spaceflight.js";
import { getQuote } from "../servicies/quotes.js";

const base = Router();

base.get("/ping", (req, res) => {
  res.send("Pong!");
});

const words = {};
base.get("/dictionary", async (req, res) => {
  const word = req.query.word;

  if (words[word]) {
    res.json(words[word]);
    return;
  }

  try {
    const wordInfo = await getDictionary(word);

    words[word] = wordInfo;

    res.json(wordInfo);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

base.get("/spaceflight_news", async (req, res) => {
  try {
    const titles = await getSpaceflightNews();
    res.json(titles);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

base.get("/quote", async (req, res) => {
  try {
    const quote = await getQuote();
    res.json(quote);
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

export default base;
