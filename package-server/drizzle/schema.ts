import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  pgSchema,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const jsonplaceholder = pgSchema("jsonplaceholder");

export const post2 = pgTable("post2", {
  id: serial().primaryKey().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  body: text().notNull(),
});

export const albumInJsonplaceholder = jsonplaceholder.table("album", {
  id: serial().primaryKey().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
});

export const commentInJsonplaceholder = jsonplaceholder.table("comment", {
  id: serial().primaryKey().notNull(),
  postId: integer().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  body: text().notNull(),
});

export const photoInJsonplaceholder = jsonplaceholder.table("photo", {
  id: serial().primaryKey().notNull(),
  albumId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  thumbnailUrl: varchar({ length: 255 }).notNull(),
});

export const postInJsonplaceholder = jsonplaceholder.table("post", {
  id: serial().primaryKey().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  body: text().notNull(),
});

export const todoInJsonplaceholder = jsonplaceholder.table("todo", {
  id: serial().primaryKey().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull(),
});

export const userInJsonplaceholder = jsonplaceholder.table("user", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  address: json().notNull(),
  phone: varchar({ length: 255 }).notNull(),
  website: varchar({ length: 255 }).notNull(),
  company: json().notNull(),
});

export const jsonplaceholderAlbum = pgTable("jsonplaceholder_album", {
  id: serial().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }),
});

export const jsonplaceholderComment = pgTable("jsonplaceholder_comment", {
  id: serial().notNull(),
  postId: integer().notNull(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  body: text().notNull(),
});

export const jsonplaceholderPhoto = pgTable("jsonplaceholder_photo", {
  id: serial().notNull(),
  albumId: integer().notNull(),
  title: varchar({ length: 255 }),
  url: varchar({ length: 255 }),
  thumbnailUrl: varchar({ length: 255 }),
});

export const jsonplaceholderPost = pgTable("jsonplaceholder_post", {
  id: serial().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }),
  body: text().notNull(),
});

export const jsonplaceholderTodo = pgTable("jsonplaceholder_todo", {
  id: serial().notNull(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }),
  completed: boolean().notNull(),
});

export const jsonplaceholderUser = pgTable("jsonplaceholder_user", {
  id: serial().notNull(),
  name: varchar({ length: 255 }),
  username: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  address: json().notNull(),
  phone: varchar({ length: 255 }),
  website: varchar({ length: 255 }),
  company: json().notNull(),
});
