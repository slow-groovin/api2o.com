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

app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.CORS_HOST ?? "https://unknown.unkown.unkown",
    ],
    allowHeaders: ["Content-Type"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    // exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);
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

/**
 * functional endpoint
 */
const functionalApp = new Hono().basePath("/api/v1");

functionalApp.get(
  "/visit/counter/page",
  bearerAuth({ token: "honoiscool" }),
  pageVisitsCounter
);

app.route("/", publicApp);
console.log("[NODE_ENV]", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  console.log("[development]bind debug handlers.");
  const { debugApp } = await import("./handler/debug/debugRoutes.js");
  app.route("/debug", debugApp);
}
