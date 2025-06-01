import { timestamp, pgTable, serial, text, unique } from "drizzle-orm/pg-core";

/*
 * random 
 */
export const randThings = pgTable("rand_things", {
  id: serial("id").primaryKey(),
  type: text().notNull(),
  value: text().notNull(),
  created_at: timestamp().notNull(),
}, (table) => [
  unique('idx_type_value').on(table.type, table.value)
]);