import { connect } from "https://deno.land/x/redis/mod.ts";

const prefix = "cocktailsdb";

console.log("Connecting to redis");
const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});
console.log("Connected.");

export function redisSet(key: string, value: string): Promise<unknown> {
  return redis.set(`${prefix}:${key}`, value);
}
export async function redisGet(key: string): Promise<string | null> {
  const res = await redis.get(`${prefix}:${key}`);
  if (!res) return null;
  return res;
}
