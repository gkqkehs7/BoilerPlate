import { createClient } from "redis";

export const redisClient = createClient();

export async function startRedis() {
  await redisClient.connect();
}
