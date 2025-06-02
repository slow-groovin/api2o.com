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
    desc: '返回一个随机的东西 (内容完全根据[提示词](https://github.com/slow-groovin/api2o.com/blob/9d58db49b44f922e937540ff9bcdaadac206dfbb/package-server/src/handler/rand/things.ts#L83)通过`gpt-4.1`自动按需生成)',
  },
  en: {
    desc: 'return a random thing object json (generated on demand automatically with [prompt](https://github.com/slow-groovin/api2o.com/blob/9d58db49b44f922e937540ff9bcdaadac206dfbb/package-server/src/handler/rand/things.ts#L83) by `gpt-4.1`)',
  }
})

useSeoMeta({
  title: 'rand/thing | API',
  description: tPage.desc,
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