<template class="">
  <div>
    <RestTemplate :desc="reqDesc">
      <template #before-desc>
        <div class="mb-4 flex gap-4">
          <AIPoweredAPIBadge />
        </div>
      </template>
    </RestTemplate>

  </div>
</template>
<script setup lang="ts">
import { type RestReqDesc, RestReqSampleImpl } from "~/lib/models/api-request";
import RestTemplate from "~/components/api/RestTemplate.vue";
import AIPoweredAPIBadge from "~/components/hint/badge/AIPoweredAPIBadge.vue";
import { useRuntimeConfig, } from "#app";
import { useSeoMeta } from '#imports'
import { usePageScopedI18n } from "~/lib/i18n";

const runtimeConfig = useRuntimeConfig()

const { tPage } = usePageScopedI18n({
  zh: {
    desc: '返回一个随机的物体',
  },
  en: {
    desc: 'return a random thing',
  }
})

useSeoMeta({
  title: 'rand/thing | API',
  description: tPage.desc + ', public free rest API of api2o.com',
})


const reqDesc: RestReqDesc = {
  name: "rand/thing",
  desc: tPage.desc,
  methods: ['GET'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/rand/thing",
    method: 'GET',

  }),
  paramOrBodyDescList: [
  ],
  responseBodyDescList: [
    {
      title: 'result.json',
      content: `{
  "type":"animal",
  "value":"cat",
}`,
      contentWithAnnotation: `{
  "type":"animal",
  "value":"cat",
}`,
    },
  ],

}



//
</script>
<style scoped lang="postcss"></style>