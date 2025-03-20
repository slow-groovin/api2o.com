import getRedisClient from "@/clients/redis.js";
import { visitKey } from "@/constants/redis-key.js";
import type { Context, Next } from "hono";

export const apiVisitCounter = async (c: Context, next: Next) => {
  incrApiVisit(c.req.path);
  return next();
};

async function incrApiVisit(path: string) {
  const redis = getRedisClient();

  // 增加总访问计数
  redis.incr(visitKey.apiTotal()).catch((err) => {
    console.error("Redis total visits incr error:", err);
  });

  // 增加特定路径的访问计数
  redis.incr(visitKey.apiPath(path)).catch((err) => {
    console.error(`Redis path ${path} visits incr error:`, err);
  });

  // 记录当天的访问量
  redis.incr(visitKey.apiDate()).catch((err) => {
    console.error(`Redis daily ${visitKey.apiDate()} incr error:`, err);
  });
}
