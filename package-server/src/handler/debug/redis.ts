import getRedisClient from "@/clients/redis.js";
import type { Context } from "hono";

export const helloRedis = async (c: Context) => {
  console.debug('[helloRedis]')
  const client = getRedisClient()
  client.set('hello', 'world' + new Date().toLocaleString())
  return c.text((await client.get('hello')) ?? " null")
}