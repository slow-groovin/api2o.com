<script setup lang="ts">
import { useI18n, useRuntimeConfig } from "#imports"
// defineI18nRoute(false)
const { locale } = useI18n()
const { public: { logo } } = useRuntimeConfig()

</script>

<template>
  <div class=" flex flex-col w-fit  min-h-[50vh] container" >

    <div class="ring-2 p-4 my-3 h-fit flex flex-col items-center ">
      <img class="rounded object-contain w-[min(50vw,20rem)] " :src="logo" alt="api2o.com logo" />
    </div>

    <div class="ring-2 prose w-fit" v-if="locale === 'en'">
      <blockquote>
        <p>api2o is a website of blog contents, webpage tools, public APIs </p>
      </blockquote>
      <div class="">
        <a href="/en/blog"> Blogs: </a>
        <ol>
          <li>useful</li>
          <li>original and unique content</li>
        </ol>

        <a href="/en/tool"> Tools: </a>
        <ol>
          <li>online web page</li>
          <li>mostly pure frontend function</li>
          <li>original and unique content</li>
        </ol>

        <a href="/en/api">APIs: </a>
        <ul>
          <li>public access</li>
          <li>creative</li>
          <li>restful, graphql, ...</li>
        </ul>
      </div>
    </div>


    <!--    zh-->
    <div class="ring-2 prose w-fit" v-if="locale === 'zh'">
      <blockquote class="">
        <p>api2o 是一个包含: 博客、在线工具、API 的网站 </p>
      </blockquote>
      <div>
        <a href="/en/blog"> 博客: </a>
        <ol>
          <li>实际有效的内容</li>
          <li>原创独特的内容</li>
        </ol>

        <a href="/en/tool"> 工具: </a>
        <ol>
          <li>在线页面方式</li>
          <li>(大部分是) 纯前端功能, 无后端请求</li>
          <li>原创独特的</li>
        </ol>

        <a href="/en/api">API: </a>
        <ul>
          <li>public access</li>
          <li>包含 RESTful, GraphQL等类型</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<style scoped></style>