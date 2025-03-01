<script setup lang="ts">
import {useI18n} from "vue-i18n"
// defineI18nRoute(false)
const {locale} = useI18n()
</script>

<template>
  <div class="prose  min-h-[50vh] mx-auto">
    <h1 class="text-center ring-2 p-5 my-3">API2O</h1>

    <div class="flex flex-row gap-3 ">
      <div class="ring-2 " v-if="locale==='en'">
        <blockquote>
          <p>api2o is a website of blog contents, webpage tools, public APIs </p>
        </blockquote>
        <div class="">
          <a href="/en/blog"> Blogs:  </a>
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
      <div class="ring-2"  v-if="locale==='zh'">
        <blockquote class="">
          <p>api2o 是一个包含: 博客、在线工具、API 的网站 </p>
        </blockquote>
        <div>
          <a href="/en/blog"> 博客:  </a>
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


  </div>
</template>

<style scoped>

</style>