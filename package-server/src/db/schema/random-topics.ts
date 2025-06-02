import { sql } from "drizzle-orm";
import { timestamp, pgTable, serial, text, unique, integer, date, uniqueIndex, index } from "drizzle-orm/pg-core";

/*
 * random 
 */
export const randThings = pgTable("rand_things", {
  id: serial().primaryKey(),
  type: text().notNull(),
  value: text().notNull(),
  created_at: timestamp().notNull(),
}, (table) => [
  uniqueIndex('idx_type_value').on(table.type, table.value)
]);

export const randTodaySentences = pgTable("rand_today_sentences", {
  id: serial().primaryKey(),
  sentence: text().notNull(),
  language_code: text().notNull(),
  date: date().notNull(),
}, (table) => [
  uniqueIndex('idx_sencence_value').on(table.sentence, table.language_code),
  index('idx_date_lang').on(table.date, table.language_code)
]);
