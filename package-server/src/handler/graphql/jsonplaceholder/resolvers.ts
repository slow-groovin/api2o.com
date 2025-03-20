import type { Resolver } from "@/handler/graphql/graphql-types.js";
import type {
  Address,
  Album,
  Comment,
  Company,
  Photo,
  Post,
  Todo,
  User,
} from "./types.js";

import { db2 } from "@/clients/drizzle-pg.js";
import {
  post as postTable,
  user as userTable,
  photo as photoTable,
  comment as commentTable,
  album as albumTable,
  todo as todoTable,
} from "@/db/schema/jsonplaceholder.js";
import { eq } from "drizzle-orm";
const MAX_SIZE = 100 as const;
// posts(start:Int!, limit:Int!):[Post!]
function verifyStartAndLimit(args: { start: number; limit: number }) {
  if (args.start < 1) {
    throw new Error("start must be greater than 0");
  }
  if (args.limit > MAX_SIZE) {
    throw new Error(`limit must be less than ${MAX_SIZE}`);
  }
}

const post: Resolver<Post> = async (
  parent,
  args: { id: number },
  context,
  info
) => {
  const records = await db2
    .select()
    .from(postTable)
    .where(eq(postTable.id, Number(args.id)));
  return records[0];
};

const postList: Resolver<Post[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  return await db2
    .select()
    .from(postTable)
    .offset(args.start - 1)
    .limit(args.limit);
};

const userByPost: Resolver<User> = async (
  parent: Post,
  args,
  context,
  info
) => {
  // console.log(parent)
  return (
    await db2.select().from(userTable).where(eq(userTable.id, parent.userId))
  )[0] as User;
};

// comments(start:Int!, limit:Int!):[Comment!]
const commentList: Resolver<Comment[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  const comments = await db2
    .select()
    .from(commentTable)
    .offset(args.start - 1)
    .limit(args.limit);
  return comments;
};

const comment: Resolver<Comment> = async (
  parent,
  args: { id: number },
  context,
  info
) => {
  const records = await db2
    .select()
    .from(commentTable)
    .where(eq(commentTable.id, Number(args.id)));
  return records[0];
};
const postByComment: Resolver<Post> = async (
  parent: Comment,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(postTable)
    .where(eq(postTable.id, Number(parent.postId)));
  return records[0];
};

// todos(start:Int!, limit:Int!):[!]
const todoList: Resolver<Todo[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  return await db2
    .select()
    .from(todoTable)
    .offset(args.start - 1)
    .limit(args.limit);
};
const todo: Resolver<Todo> = async (
  parent,
  args: { id: number },
  context,
  info
) => {
  const records = await db2
    .select()
    .from(todoTable)
    .where(eq(todoTable.id, Number(args.id)));
  return records[0];
};
const userByTodo: Resolver<User> = async (
  parent: Todo,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(userTable)
    .where(eq(userTable.id, Number(parent.userId)));
  const user = records[0];
  if (!user) return user;
  return user as User;
};

// users(start:Int!, limit:Int!):[User!]
const userList: Resolver<User[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  const records = await db2
    .select()
    .from(userTable)
    .offset(args.start - 1)
    .limit(args.limit);
  return records.filter((user): user is User => Boolean(user));
};
const user: Resolver<User> = async (
  parent,
  args: { id?: number },
  context,
  info
) => {
  console.debug(args.id, typeof args.id);
  const records = await db2
    .select()
    .from(userTable)
    .where(eq(userTable.id, Number(args.id)));
  return records[0] as User;
};

const postsByUser: Resolver<Post[]> = async (
  parent: User,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(postTable)
    .where(eq(postTable.userId, parent.id));
  return records;
};

const todosByUser: Resolver<Todo[]> = async (
  parent: User,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(todoTable)
    .where(eq(todoTable.userId, parent.id));
  return records;
};

const albumsByUser: Resolver<Album[]> = async (
  parent: User,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(albumTable)
    .where(eq(albumTable.userId, parent.id));
  return records;
};

// albums(start:Int!, limit:Int!):[Album!]
const albumList: Resolver<Album[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  return await db2
    .select()
    .from(albumTable)
    .offset(args.start - 1)
    .limit(args.limit);
};

const album: Resolver<Album> = async (
  parent,
  args: { id: number },
  context,
  info
) => {
  const records = await db2
    .select()
    .from(albumTable)
    .where(eq(albumTable.id, Number(args.id)));
  return records[0];
};

const userByAlbum: Resolver<User> = async (
  parent: Album,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(userTable)
    .where(eq(userTable.id, Number(parent.userId)));
  return records[0] as User;
};

const photosByAlbum: Resolver<Photo[]> = async (
  parent: Album,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(photoTable)
    .where(eq(photoTable.albumId, parent.id));
  return records;
};

// photos(start:Int!, limit:Int!):[Photo!]
const photoList: Resolver<Photo[]> = async (
  parent,
  args: { start: number; limit: number },
  context,
  info
) => {
  verifyStartAndLimit(args);
  return await db2
    .select()
    .from(photoTable)
    .offset(args.start - 1)
    .limit(args.limit);
};

const photo: Resolver<Photo> = async (
  parent,
  args: { id: number },
  context,
  info
) => {
  const records = await db2
    .select()
    .from(photoTable)
    .where(eq(photoTable.id, Number(args.id)));
  return records[0];
};

const albumByPhoto: Resolver<Album> = async (
  parent: Photo,
  args,
  context,
  info
) => {
  const records = await db2
    .select()
    .from(albumTable)
    .where(eq(albumTable.id, Number(parent.albumId)));
  return records[0];
};

export const jsonPlaceholderResolvers = {
  post,
  postList,
  userByTodo,
  userByPost,
  userList,
  user,
  postsByUser,
  todosByUser,
  albumsByUser,
  albumList,
  album,
  photosByAlbum,
  userByAlbum,
  photoList,
  photo,
  albumByPhoto,
  commentList,
  comment,
  postByComment,
  todoList,
  todo,
};
