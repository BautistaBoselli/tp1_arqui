const HttpError = require("../utils/http-error");

async function getSpaceflightNews() {
  try {
    const aux = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=5`);
    const data = await aux.json();
    const titles = data.results.map((article) => article.title);

    return titles;
  } catch (error) {
    throw new HttpError("Could not get latests news", 500);
  }
}

module.exports = getSpaceflightNews;
