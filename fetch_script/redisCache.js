const prefix = "cocktailsdb";

console.log("Connecting to redis");
const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});
console.log("Connected.");

export function redisSet(key, value) {
  return redis.set(`${prefix}:${key}`, value);
}

export async function redisGet(key) {
  const res = await redis.get(`${prefix}:${key}`);
  if (!res) return null;
  return res;
}
