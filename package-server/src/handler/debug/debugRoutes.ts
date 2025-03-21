import { Hono } from "hono";
import { helloRedis } from "./redis.js";
import { helloDrizzlePg } from "./drizzle.js";
import { helloUnstorage } from "./unstorage.js";

export const debugApp = new Hono();
debugApp.get("/redis", helloRedis);
debugApp.get("/drizzle", helloDrizzlePg);
debugApp.get("/unstorage", helloUnstorage);
