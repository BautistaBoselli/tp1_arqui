const express = require("express");

const app = express();

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.get("/dictionary", async (req, res) => {
  const word = req.query.word;
  if (!word) {
    res.status(400).send("Please provide a word");
    return;
  }
  try {
    const aux = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await aux.json();
    if (!Array.isArray(data) || data.length === 0) {
      res.status(404).send("Word provided doesnt exist");
      return;
    }
    res.json({
      word: data[0].word,
      phonetics: data[0].phonetics,
      meanings: data[0].meanings,
    });
  } catch (err) {
    res.status(500).send("Could not get word meaning");
  }
});

app.get("/spaceflight_news", async (req, res) => {
  try {
    const aux = await fetch(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=5`
    );
    const data = await aux.json();
    const titles = data.results.map((article) => article.title);
    res.json(titles);
  } catch (err) {
    res.status(500).send("Could not get latests news");
  }
});

app.get("/quote", async (req, res) => {
  try {
    const aux = await fetch(`https://api.quotable.io/quotes/random`);
    const data = await aux.json();
    res.json({
      content: data[0].content,
      author: data[0].author,
    });
  } catch (err) {
    res.status(500).send("Could not get latests news");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
