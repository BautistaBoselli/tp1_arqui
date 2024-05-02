import { createClient } from "redis";

const redis = await createClient({
  url: "redis://redis:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function getJson(key) {
  return JSON.parse((await redis.get(key)) ?? "null");
}

export function setJson(key, value, params) {
  return redis.set(key, JSON.stringify(value), params);
}

redis.getJson = getJson;
redis.setJson = setJson;

export { redis };
