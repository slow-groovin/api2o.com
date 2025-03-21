import { text, json } from "drizzle-orm/pg-core";
import {
  integer,
  pgTable,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

export const post = pgTable("jsonplaceholder_post", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  // comments: Comment[]
  // user: User @relation(fields: [userId], references: [id])
});

export const comment = pgTable("jsonplaceholder_comment", {
  id: serial("id").primaryKey(),
  postId: integer("postId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  body: text("body").notNull(),
  // post: Post @relation(fields: [postId], references: [id])
});

export const user = pgTable("jsonplaceholder_user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  address: json("address").notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }).notNull(),
  company: json("company").notNull(),
  // posts: Post[]
  // todos: Todo[]
  // albums: Album[]
});

export const todo = pgTable("jsonplaceholder_todo", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").notNull(),
  // user: User @relation(fields: [userId], references: [id])
});

export const album = pgTable("jsonplaceholder_album", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  // user: User @relation(fields: [userId], references: [id])
  // photos: Photo[]
});

export const photo = pgTable("jsonplaceholder_photo", {
  id: serial("id").primaryKey(),
  albumId: integer("albumId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 255 }).notNull(),
  // album: Album @relation(fields: [albumId], references: [id])
});

// export const comments = pgTable("jsonplaceholder_comments", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   title: text().notNull(),
//   slug: varchar({ length: 16 }).$default(() => generateUniqueString(16)),
//   content: varchar({ length: 255 }).notNull(),
//   owner_id: integer().references(() => users.id),
//   ...timestamps,
// })

// export const commentsRelations = relations(comments, ({ one }) => ({
//   owner: one(users, { fields: [comments.owner_id], references: [users.id] })
// }))
