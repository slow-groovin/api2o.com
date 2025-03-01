<template>
  <GraphQLTemplate :desc="desc" endpoint="/api/v1/jsonplaceholder/graphql">
    <template #after-desc>
      <div>
        <a href="https://jsonplaceholder.typicode.com/" target="_blank" class="text-blue-800 underline">JSONPlaceholder comes with a set of 6 common resources, is a free online REST API.</a>
      </div>
    </template>
  </GraphQLTemplate>
</template>

<script setup lang="ts">
import {type GraphqlOpTypeStr, type GraphqlReqDesc} from "~/utils/api/desc";
import GraphQLTemplate from "~/components/api/GraphQLTemplate.vue";

const {tPage}=usePageScopedI18n({
  zh:{
    desc:'GraphQL 版本的 JSONPlaceholder！免费在线 GraphQL API，用于测试和原型开发。',
    postsDesc:'批量查询 posts',
    commentsDesc:'批量查询 comments',
    todosDesc:'批量查询 todos',
    usersDesc:'批量查询 users',
    albumsDesc:'批量查询 albums',
    photosDesc:'批量查询 photos',
    postDesc:'查询单个 post',
    userDesc:'查询单个 user',
    albumDesc:'查询单个 album',
    photoDesc:'查询单个 photo',
    commentDesc:'查询单个 comment',
    postsAnnotation:'批量查询 posts, start: 起始的id(从1开始), limit: 查询结果的数量'
  },
  en:{
    desc:  "GraphQL version of JSONPlaceholder! Free fake online GraphQL API for testing and prototyping GraphQL.",
    postsDesc:'Batch query posts',
    commentsDesc:'Batch query comments',
    todosDesc:'Batch query todos',
    usersDesc:'Batch query users',
    albumsDesc:'Batch query albums',
    photosDesc:'Batch query photos',
    postDesc:'Query a single post',
    userDesc:'Query a single user',
    albumDesc:'Query a single album',
    photoDesc:'Query a single photo',
    commentDesc:'Query a single comment',
    postsAnnotation:'Batch query posts, start: starting id (starting from 1), limit: number of results to retrieve.'
  }
})



useSeoMeta({
  title: 'GraphQL JSONPlaceholder| API',
  description: tPage.desc
})

const desc: GraphqlReqDesc = {
  desc: tPage.desc,
  name: "JSON Placeholder",
  samples: [
    {
      title: "posts",
      desc: tPage.postsDesc,
      body:
          `query {
    posts(start: 1, limit: 10) {
        id
        userId
        title
        body
        user {
          id
          username
          email
          phone
          website
        }
    }
}`
    },
    {
      title: "comments",
      desc: tPage.commentsDesc,
      body:
          `query {
    comments(start: 1, limit: 10) {
        id
        postId
        name
        email
        body
        post {
            id
            title
        }
    }
}`
    },
    {
      title: "todos",
      desc: tPage.todosDesc,
      body:
          `query {
    todos(start: 1, limit: 10) {
        id
        title
        completed
        user {
            id
            username
        }
    }
}`
    },
    {
      title: "users",
      desc: tPage.usersDesc,
      body:
          `query {
    users(start: 1, limit: 10) {
        id
        name
        username
        email
        website
    }
}`
    },
    {
      title: "albums",
      desc: tPage.albumsDesc,
      body:
          `query {
    albums(start: 1, limit: 10) {
        id
        userId
        title
    }
}`
    },
    {
      title: "photos",
      desc: tPage.photosDesc,
      body:
          `query {
    photos(start: 1, limit: 10) {
        id
        title
        url
        thumbnailUrl
        album {
            id
            title
            userId
        }
    }
}`
    },
    {
      title: "post",
      desc: tPage.postDesc,
      body:
          `query {
    post(id: 1) {
        id
        title
        body
        user {
            username
            email
        }
    }
}`
    },
    {
      title: "user",
      desc: tPage.userDesc,
      body:
          `query {
    user(id: 1) {
        id
        name
        username
        email
        address{
          street
          suite
          city
          zipcode
          geo{
            lat
            lng
          }
        }
        website
        company {
            name
            catchPhrase
            bs
        }
    }
}`
    },
    {
      title: "album",
      desc: tPage.albumDesc,
      body:
          `query {
    album(id: 1) {
        id
        title
        user {
            id
            username
        }
        photos {
            id
            title
            url
        }
    }
}`
    },
    {
      title: "photo",
      desc: tPage.photoDesc,
      body:
          `query {
    photo(id: 1) {
        id
        title
        url
        album {
            id
            title
            user{
              id
              username
            }
        }
    }
}`
    },
    {
      title: "comment",
      desc: tPage.commentDesc,
      body:
          `query {
    comment(id: 1) {
        id
        body
        post {
            id
            title
        }
    }
}`
    }

  ],
  operations: codeToOperations(`
    posts(start:Int!, limit:Int!):[Post!]  #${tPage.postsAnnotation}
    comments(start:Int!, limit:Int!):[Comment!]
    todos(start:Int!, limit:Int!):[Todo!]
    users(start:Int!, limit:Int!):[User!]
    albums(start:Int!, limit:Int!):[Album!]
    photos(start:Int!, limit:Int!):[Photo!]

    post(id:ID!): Post
    user(id:ID!): User
    todo(id:ID!): Todo
    album(id:ID!): Album
    photo(id:ID!): Photo
    comment(id:ID!): Comment
  `, 'query'),
  types: [
    {
      title: "Post",
      content:
          `type Post{
    userId: Int
    id: Int
    title: String
    body: String
    user: User
}`
    },
    {
      title: "Comment",
      content:
          `type Comment{
    postId: Int
    id: Int
    name: String
    email: String
    body: String
    post: Post
}`
    },
    {
      title: "User",
      content:
          `type User{
    id: Int
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company

    posts:[Post!]
    todos:[Todo!]
    albums:[Album!]
}


type Geo{
    lat: String
    lng: String
}

type Address{
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
}
type Company{
    name: String
    catchPhrase: String
    bs: String
}`
    },
    {
      title: "Todo",
      content:
          `type Todo{
    userId: Int
    id: Int
    title: String
    completed: Boolean
    user: User
}`
    },
    {
      title: "Album",
      content:
          `type Album{
    userId: Int
    id: Int
    title: String

    user: User
    photos:[Photo!]
}`
    },
    {
      title: "Photo",
      content:
          `type Photo{
    albumId: Int
    id: Int
    title: String
    url: String
    thumbnailUrl: String

    album: Album
}`
    },


  ]
}

function codeToOperations(code: string, type: GraphqlOpTypeStr): {
  type: GraphqlOpTypeStr,
  content: string,
  annotation?: string
}[] {
  return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const index = line.indexOf('#')
        if(index!==-1){
          return {
            content: line.substring(0, index),
            annotation: line.substring(index + 1),
            type: type
          }
        }else{
          return {
            content: line,
            type: type
          }
        }

      })
}
</script>

<style scoped lang="postcss">
</style>
