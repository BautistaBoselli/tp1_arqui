import { Router } from "express";
import { getDictionary } from "../servicies/dictionary.js";
import { getQuote } from "../servicies/quotes.js";
import { getSpaceflightNews } from "../servicies/spaceflight.js";

const base = Router();

base.get("/ping", (req, res) => {
  res.send("Pong!");
});

base.get("/dictionary", async (req, res) => {
  const word = req.query.word;

  try {
    const wordInfo = await getDictionary(word);
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
