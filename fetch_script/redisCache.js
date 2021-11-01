import { createClient } from "redis";

const prefix = "cocktailsdb";

console.log("Connecting to redis");
const client = await createClient({
  hostname: "127.0.0.1",
  port: 6379,
});
client.on("error", (err) => console.log("Redis Client Error", err));
console.log("Connected.");

export function redisSet(key, value) {
  return client.set(`${prefix}:${key}`, value);
}

export async function redisGet(key) {
  const res = await client.get(`${prefix}:${key}`);
  if (
    !res ||
    // j'ai eu un bug où je recevais un boolean "true", je sais pas pk ??
    typeof res != "string"
  )
    return null;
  return res;
}

export function redisQuit() {
  client.quit();
}
