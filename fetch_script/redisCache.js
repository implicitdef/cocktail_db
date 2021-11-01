import { createClient } from "redis";

const prefix = "cocktailsdb";

console.log("Connecting to redis");
const client = await createClient({
  socket: { host: "127.0.0.1", port: 6379 },
});
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

export function redisSet(key, value) {
  return client.set(`${prefix}:${key}`, value);
}

export async function redisGet(key) {
  const res = await client.get(`${prefix}:${key}`);
  if (!res) return null;
  return res;
}

export function redisQuit() {
  client.quit();
}
