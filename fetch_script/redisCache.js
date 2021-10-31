import { createClient } from "redis";

const prefix = "cocktailsdb";

console.log("Connecting to redis");
const client = await createClient({
  hostname: "127.0.0.1",
  port: 6379,
});
console.log("Connected.");

export function redisSet(key, value) {
  return client.set(`${prefix}:${key}`, value);
}

export async function redisGet(key) {
  const res = await client.get(`${prefix}:${key}`);
  if (!res) return null;
  return res;
}
