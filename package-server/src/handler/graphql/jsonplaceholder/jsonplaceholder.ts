import { createSchema, createYoga } from "graphql-yoga";
import { jsonPlaceholderResolvers } from "./resolvers.js";
import { useResponseCache } from "@envelop/response-cache";
import type { Context } from "hono";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      posts(start: Int!, limit: Int!): [Post!]
      comments(start: Int!, limit: Int!): [Comment!]
      todos(start: Int!, limit: Int!): [Todo!]
      users(start: Int!, limit: Int!): [User!]
      albums(start: Int!, limit: Int!): [Album!]
      photos(start: Int!, limit: Int!): [Photo!]

      post(id: ID!): Post
      user(id: ID!): User
      todo(id: ID!): Todo
      album(id: ID!): Album
      photo(id: ID!): Photo
      comment(id: ID!): Comment
    }
    type Post {
      userId: Int
      id: Int
      title: String
      body: String
      user: User
    }

    type Comment {
      postId: Int
      id: Int
      name: String
      email: String
      body: String
      post: Post
    }
    type Todo {
      userId: Int
      id: Int
      title: String
      completed: Boolean
      user: User
    }

    type User {
      id: Int
      name: String
      username: String
      email: String
      address: Address
      phone: String
      website: String
      company: Company

      posts: [Post!]
      todos: [Todo!]
      albums: [Album!]
      photos: [Photo!]
    }

    type Geo {
      lat: String
      lng: String
    }

    type Address {
      street: String
      suite: String
      city: String
      zipcode: String
      geo: Geo
    }

    type Company {
      name: String
      catchPhrase: String
      bs: String
    }

    type Photo {
      albumId: Int
      id: Int
      title: String
      url: String
      thumbnailUrl: String

      album: Album
    }

    type Album {
      userId: Int
      id: Int
      title: String

      user: User
      photos: [Photo!]
    }
  `,
  resolvers: {
    Query: {
      post: jsonPlaceholderResolvers.post,
      user: jsonPlaceholderResolvers.user,
      todo: jsonPlaceholderResolvers.todo,
      album: jsonPlaceholderResolvers.album,
      photo: jsonPlaceholderResolvers.photo,
      comment: jsonPlaceholderResolvers.comment,
      posts: jsonPlaceholderResolvers.postList,
      comments: jsonPlaceholderResolvers.commentList,
      todos: jsonPlaceholderResolvers.todoList,
      users: jsonPlaceholderResolvers.userList,
      albums: jsonPlaceholderResolvers.albumList,
      photos: jsonPlaceholderResolvers.photoList,
    },
    Post: {
      user: jsonPlaceholderResolvers.userByPost,
    },
    Comment: {
      post: jsonPlaceholderResolvers.postByComment,
    },
    Todo: {
      user: jsonPlaceholderResolvers.userByTodo,
    },
    Album: {
      user: jsonPlaceholderResolvers.userByAlbum,
      photos: jsonPlaceholderResolvers.photosByAlbum,
    },
    User: {
      posts: jsonPlaceholderResolvers.postsByUser,
      todos: jsonPlaceholderResolvers.todosByUser,
      albums: jsonPlaceholderResolvers.albumsByUser,
    },
    Photo: {
      album: jsonPlaceholderResolvers.albumByPhoto,
    },
  },
});

console.log("create yoga server");

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  plugins: [
    useResponseCache({
      session: () => null,
      ttl: 30_000,
    }),
  ],
});

export const jsonPlaceholderHandlers = async (c: Context) => {
  console.debug("[graphql][jsonplaceholder] receive request.");
  return await yoga.fetch(c.req.raw, c);
};
