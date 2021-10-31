import { redisGet, redisSet } from "./redisCache.js";

export async function httpCallCached(url) {
  return throttle(async () => {
    const cacheKey = `http:${url}`;
    const cache = await redisGet(cacheKey);
    if (cache) return cache;
    console.log(">>>>>", url);
    const res = await fetch(url);
    console.log("<<<", res.status);
    if (res.status !== 200) {
      throw new Error("not 200 on " + url + "" + res.status);
    }
    const text = await res.text();
    redisSet(cacheKey, text);
    return text;
  });
}
