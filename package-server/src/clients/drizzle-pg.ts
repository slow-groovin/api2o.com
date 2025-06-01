import { allSchemas } from "@/db/schema/index.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

//当前0.40版本有bug,pgSchema的无法使用Query语法 https://github.com/drizzle-team/drizzle-orm/issues/4272
export const db = drizzle(process.env.DATABASE_URL!, {
  schema: allSchemas,
  logger: process.env.NODE_ENV === 'development',
});
export const db2 = drizzle(process.env.DATABASE_URL!, { logger: process.env.NODE_ENV === 'development' });
