import { db, db2 } from "@/clients/drizzle-pg.js";
import { post } from "@/db/schema/jsonplaceholder.js";
import type { Context } from "hono";

export const helloDrizzlePg = async (c: Context) => {
  console.debug("[helloDrizzlePg]");

  const rs = await db2.select().from(post).limit(10);

  //当前0.40版本有bug,pgSchema的无法使用Query语法 https://github.com/drizzle-team/drizzle-orm/issues/4272
  // const rs = await db.query.album.findMany({
  //   limit: 10,
  // });
  return c.json(rs);
};
