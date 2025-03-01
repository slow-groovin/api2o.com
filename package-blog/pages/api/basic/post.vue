<template class="">
  <div>
    <RestTemplate :desc="reqDesc">
      <template #res-end-area>
        <div class="prose">
          <blockquote>
            <p>
              Need to parse ObjectID? visit <NuxtLink :to="useLocalePathFunc('/tool/object-id-parser')"
                :target="'blank'">Online ObjectId Parser</NuxtLink>
            </p>
          </blockquote>
        </div>
      </template>
    </RestTemplate>
  </div>
</template>
<script setup lang="ts">
import { type RestReqDesc, RestReqSampleImpl } from "~/lib/models/api-request";
import RestTemplate from "~/components/api/RestTemplate.vue";
import { useRuntimeConfig, } from "#app";
import { useLocalePath, useSeoMeta } from "#imports";
import { usePageScopedI18n } from "~/lib/i18n";

const runtimeConfig = useRuntimeConfig()
const useLocalePathFunc = useLocalePath()



const reqSampleBody1 = `
{
  "my":{
    "content":{
      "msg":"any content, any structure"
      "enabled":true,
      "age": 20,
      "tag": ["hi",1,false]
    }
  }
}`

const reqSampleBodyWithAnno1 = `//just any valid json, not exceed 1Kb \n${reqSampleBody1}`
const resSampleBody1 = `{
  "id":"AB88E54ADC",
  "timestamp":16888888888,
  "loc": 1,
  "content": {
    "my":{
      "content":{
        "msg":"any content, any structure"
        "enabled":true,
        "age": 20,
        "tag": ["hi",1,false]
      }
    }
  }
}
`
const resSampleBodyWithAnnotation1 = `{
  "id":"670ddc960847b148cadfa2fc", //a random ObjectId
  "timestamp":16888888888, //handle time
  "loc": 1, //index of a fix-sized ring cache
  "content": { //data in request
    "my":{
      "content":{
        "msg":"any content, any structure"
        "enabled":true,
        "age": 20,
        "tag": ["hi",1,false]
      }
    }
  }
}
`
const resSampleBodyWithAnnotationZh1 = `{
  "id":"670ddc960847b148cadfa2fc", // 随机的 ObjectId
  "timestamp":16888888888, //请求的时间戳
  "loc": 1, // 数据在环形缓存中的下标位置
  "content": { //发送的原始数据
    "my":{
      "content":{
        "msg":"any content, any structure"
        "enabled":true,
        "age": 20,
        "tag": ["hi",1,false]
      }
    }
  }
}
`
const { tPage } = usePageScopedI18n({
  zh: {
    desc: '通过request body发送任何内容(<1KB), 发送的内容会被存在一个环形缓存中, 返回 id,时间戳,在环形缓存中的index,原始内容',
    resSampleBodyWithAnnotation1: resSampleBodyWithAnnotation1

  },
  en: {
    desc: 'send anything in body of post request (< 1KB), the body content will be store in a ringed-cache, the api returns id,timestamp,loc(ringed-cache index),raw content',
    resSampleBodyWithAnnotation1: resSampleBodyWithAnnotationZh1
  }
})

useSeoMeta({
  title: 'post | API',
  description: tPage.desc + ', public free rest API of api2o.com',
})
const reqDesc: RestReqDesc = {
  name: "post",
  desc: tPage.desc,
  methods: ['POST'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/post",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      my: {
        content: {
          msg: "any content, any structure"
        }
      }
    }

  }),
  paramOrBodyDescList: [
    {
      title: 'sample.json',
      content: reqSampleBody1,
      contentWithAnnotation: reqSampleBodyWithAnno1,
    }
  ],
  responseBodyDescList: [
    {
      title: 'result.json',
      content: resSampleBody1,
      contentWithAnnotation: tPage.resSampleBodyWithAnnotation1,
    },
  ],
}



//
</script>
<style scoped lang="postcss"></style>