import { createClient } from "redis";

const _redis = await createClient({
  url: "redis://redis:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function getJson(key) {
  return JSON.parse((await _redis.get(key)) ?? "[]");
}

export function setJson(key, value, params) {
  return _redis.set(key, JSON.stringify(value), params);
}

export const redis = {
  getJson,
  setJson,
  ..._redis,
};
