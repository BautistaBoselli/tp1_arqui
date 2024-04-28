import { HttpError } from "../utils/http-error.js";
import { measureExecution } from "../utils/metrics.js";

export async function getSpaceflightNews() {
  try {
    const data = await measureExecution("external_api_time", async () => {
      const aux = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=5`);
      const data = await aux.json();
      return data;
    });
    const titles = data.results.map((article) => article.title);

    return titles;
  } catch (error) {
    console.error(error);
    throw new HttpError("Could not get latests news", 500);
  }
}
