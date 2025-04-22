import { Hono } from "hono";
import { echo } from "./handler/echo.js";
import { cors } from "hono/cors";

import "dotenv/config";
import { ping } from "./handler/ping.js";
import { postHandler } from "./handler/post.js";
import { getRandomThing } from "./handler/rand/things.js";
import { jsonPlaceholderHandlers } from "./handler/graphql/jsonplaceholder/jsonplaceholder.js";
import { apiVisitCounter } from "./middlewares/visit-counter.js";
import { pageVisitsCounter } from "./handler/counter/page-visits-counter.js";
import { bearerAuth } from "hono/bearer-auth";

export const app = new Hono();

if (process.env.NODE_ENV === "production") {
  console.log("[CORS_HOST]", process.env.CORS_HOST);
  app.use(
    cors({
      origin: [process.env.CORS_HOST!],
      allowHeaders: ["Content-Type"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["access-control-allow-origin"],
      // exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
      maxAge: 600,
      credentials: true,
    })
  );
} else {
  // always allow origin in dev environment(for that http diff port fetch will not send origin header)
  app.use(async (c, next) => {
    c.header("Access-Control-Allow-Origin", process.env.CORS_HOST!);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (c.req.method === "OPTIONS") {
      return c.body(null, 200);
    }
    return next();
  });
}

/**
 * public endpoint /api/v1
 */
const publicApp = new Hono().basePath("/api/v1");

publicApp.use(apiVisitCounter); //记录访问路径
publicApp.route("/", echo);
publicApp.route("/", ping);
publicApp.route("/", postHandler);
publicApp.get("/rand/thing", getRandomThing);
publicApp.post("/jsonplaceholder/graphql", jsonPlaceholderHandlers);

app.post(
  "/api/v1/visit/counter/page",
  bearerAuth({ token: process.env.API_BEARER_TOKEN! }),
  pageVisitsCounter
);
app.route("/", publicApp);

console.log("[NODE_ENV]", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  console.log("[development]bind debug handlers.");
  const { debugApp } = await import("./handler/debug/debugRoutes.js");
  app.route("/api/v1/debug", debugApp);
}
