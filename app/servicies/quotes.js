const HttpError = require("../utils/http-error");

async function getQuote() {
  try {
    const aux = await fetch(`https://api.quotable.io/quotes/random`);
    const data = await aux.json();
    return {
      content: data[0].content,
      author: data[0].author,
    };
  } catch (err) {
    throw new HttpError("Could not get latests news", 500);
  }
}

module.exports = getQuote;
