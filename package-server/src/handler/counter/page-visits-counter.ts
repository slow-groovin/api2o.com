import getRedisClient from "@/clients/redis.js";
import { visitKey } from "@/constants/redis-key.js";
import type { Context } from "hono";

export const pageVisitsCounter = async (c: Context) => {
  const path = c.req.query("path");
  if (!path) {
    return c.text("no path.", 400);
  }
  await incrPagePathVisit(path);
  return c.text("suc");
};

async function incrPagePathVisit(path: string) {
  const redis = getRedisClient();
  console.debug("visit:", path);

  // 增加总访问计数
  redis.incr(visitKey.pageTotal()).catch((err) => {
    console.error("Redis total visits incr error:", err);
  });

  // 增加特定路径的访问计数
  redis.incr(visitKey.pagePath(path)).catch((err) => {
    console.error(`Redis path ${path} visits incr error:`, err);
  });

  // 记录当天的访问量
  redis.incr(visitKey.apiDate()).catch((err) => {
    console.error(`Redis daily ${visitKey.apiDate()} visits incr error:`, err);
  });
}
