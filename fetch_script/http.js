import { redisGet, redisSet } from "./redisCache.js";
import { throttle } from "./throttle.js";
import fetch from "node-fetch";

export async function httpCallCached(url) {
  return throttle(async () => {
    const cacheKey = `http:${url}`;
    const cache = await redisGet(cacheKey);
    if (cache) {
      return cache;
    }
    console.log(">>>>>", url);
    const response = await fetch(url);
    console.log("<<<", response.status);
    if (!response.ok) {
      throw new Error("not 2xx on " + url + "" + response.status);
    }
    const text = await response.text();
    redisSet(cacheKey, text);
    return text;
  });
}
