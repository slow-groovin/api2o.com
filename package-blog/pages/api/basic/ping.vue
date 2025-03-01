<template class="">
  <RestTemplate :desc="reqDesc" />
</template>
<script setup lang="ts">

import { type RestReqDesc, RestReqSampleImpl } from "~/lib/models/api-request";
import RestTemplate from "~/components/api/RestTemplate.vue";
import { useRuntimeConfig } from "#app";
import { useSeoMeta } from '#imports'
import { usePageScopedI18n } from "~/lib/i18n";

const runtimeConfig = useRuntimeConfig()

const { tPage } = usePageScopedI18n({
  zh: {
    desc: '直接返回"pong"',
  },
  en: {
    desc: 'return "pong"',
  }
})

useSeoMeta({
  title: 'ping | API',
  description: tPage.desc + ', public free rest API of api2o.com',
})


const reqDesc: RestReqDesc = {
  name: "ping",
  desc: tPage.desc,
  methods: ['GET'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/ping",
    method: 'GET',
  }),
  paramOrBodyDescList: [
  ],
  responseBodyDescList: [
    {
      title: 'ping',
      content: 'pong',
      contentWithAnnotation: `pong`
    }
  ],
}



</script>
<style scoped lang="postcss"></style>