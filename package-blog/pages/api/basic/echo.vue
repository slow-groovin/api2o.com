<template class="">
  <div>
    <RestTemplate :desc="reqDesc" />

  </div>
</template>
<script setup lang="ts">
import { useRuntimeConfig, } from "#app";
import { useI18n, useSeoMeta } from "#imports";
import RestTemplate from "~/components/api/RestTemplate.vue";
import { usePageScopedI18n } from "~/lib/i18n";
import { type RestReqDesc, RestReqSampleImpl } from "~/lib/models/api-request";

const runtimeConfig = useRuntimeConfig()
const { locale } = useI18n()
const { tPage } = usePageScopedI18n({
  zh: {
    desc: '直接返回输入的msg',
  },
  en: {
    desc: 'directly return the request param msg',
  }
})

useSeoMeta({
  title: 'echo | API',
  description: tPage.desc + ', public free rest API of api2o.com',
})

const reqDescZh: RestReqDesc = {
  name: "echo",
  desc: tPage.desc,
  methods: ['GET'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/echo?msg=你好,api2o",
    method: 'GET',
  }),
  paramOrBodyDescList: [
    {
      title: '全部参数',
      content: '?msg=你好,api2o&resp_type=text',
      contentWithAnnotation: `?msg=hello&resp_type=text
//msg:string  返回的消息
//resp_type:"text"|"json" 返回内容的类型'
      `
    },
  ],
  responseBodyDescList: [
    {
      title: 'resp_type=text',
      content: '你好,api2o',
      contentWithAnnotation: `hello,api2o\n//返回的文本`
    },
    {
      title: 'resp_type=json',
      content: '{"msg": "你好,api2o"}',
      contentWithAnnotation: `{
  "msg": "你好,api2o" //返回的文本
}`
    }
  ],
}



const reqDescEn: RestReqDesc = {
  name: "echo",
  desc: tPage.desc,
  methods: ['GET'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/echo?msg=hello,api2o",
    method: 'GET',
  }),
  paramOrBodyDescList: [
    {
      title: 'all param',
      content: '?msg=hello,api2o&resp_type=text',
      contentWithAnnotation: `?msg=hello&resp_type=text
//msg:string  the return msg(same to request param msg)
//resp_type:"text"|"json"  response type'
      `
    },
  ],
  responseBodyDescList: [
    {
      title: 'resp_type=text',
      content: 'hello,api2o',
      contentWithAnnotation: `hello,api2o\n//the return msg`
    },
    {
      title: 'resp_type=json',
      content: '{"msg": "hello"}',
      contentWithAnnotation: `{
  "msg": "hello" //the return msg
}`
    }
  ],
}
const reqDesc = locale.value === 'zh' ? reqDescZh : reqDescEn
//
</script>
<style scoped lang="postcss"></style>