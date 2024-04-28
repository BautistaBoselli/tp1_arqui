import { HttpError } from "../utils/http-error.js";
import { measureExecution } from "../utils/metrics.js";

export async function getQuotes(numberOfQuotes = 1) {
  try {
    const data = await measureExecution("external_api_time", async () => {
      const aux = await fetch(`https://api.quotable.io/quotes/random?limit=${numberOfQuotes}`);
      const data = await aux.json();
      return data;
    });
    return data.map((quote) => ({
      content: quote.content,
      author: quote.author,
    }));
  } catch (err) {
    console.log(err);
    throw new HttpError("Could not get latests news", 500);
  }
}
