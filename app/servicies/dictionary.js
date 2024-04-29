import { HttpError } from "../utils/http-error.js";
import { measureExecution } from "../utils/metrics.js";

export async function getDictionary(word) {
  if (!word) {
    throw new HttpError("Please provide a word", 400);
  }

  let data;
  try {
    data = await measureExecution("external_api_time", async () => {
      const aux = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!aux.ok) {
        throw new HttpError("Could not get word meaning", aux.status);
      }
      return await aux.json();
    });
  } catch (err) {
    throw new HttpError("Could not get word meaning", 500);
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new HttpError("Word provided does not exist", 404);
  }

  const wordInfo = {
    word: data[0].word,
    phonetics: data[0].phonetics,
    meanings: data[0].meanings,
  };

  return wordInfo;
}
