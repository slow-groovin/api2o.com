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
    desc: `每日一言 <br/> (使用[提示词](https://github.com/slow-groovin/api2o.com/blob/a380e6f22ac09ab9eb41158a2f2bdfbb16c0ceb0/package-server/src/handler/rand/today-sentence.ts#L152)根据今天的日期和一些最新的新闻通过\`gpt-4.1\`自动按需生成)`,
  },
  en: {
    desc: 'today\'s setence <br/> (generated on demand automatically with [prompt](https://github.com/slow-groovin/api2o.com/blob/a380e6f22ac09ab9eb41158a2f2bdfbb16c0ceb0/package-server/src/handler/rand/today-sentence.ts#L152) by `gpt-4.1`)',
  }
})

useSeoMeta({
  title: 'rand/sentence | API',
  description: tPage.desc,
})


const reqDesc: RestReqDesc = {
  name: "rand/sentence",
  desc: tPage.desc,
  methods: ['GET'],
  sample: new RestReqSampleImpl({
    baseUrl: runtimeConfig.public.apiBaseUrl,
    url: "/api/v1/rand/sentence",
    method: 'GET',

  }),
  paramOrBodyDescList: [
    {
      title: 'all params',
      content: '?lang=zh&format=text',
      contentWithAnnotation: `?lang=zh&format=text
//lang:string  ISO-639-1 language code (Optional, default: en)
//format:"text"|"json" response type (Optional, default: text)`
    },

  ],
  responseBodyDescList: [
    {
      title: 'result.txt',
      content: `Just as the sun rises after the storm, every new day brings a fresh chance to write your own story.`,
      contentWithAnnotation: `Just as the sun rises after the storm, every new day brings a fresh chance to write your own story.`,
    },

    {
      title: 'result.json',
      content: `{
  "sentence": "Just as the sun rises after the storm, every new day brings a fresh chance to write your own story.",
  "date": "2025-06-03",
  "lang": "en"
}`,
      contentWithAnnotation: `{
  "sentence": "Just as the sun rises after the storm, every new day brings a fresh chance to write your own story.",
  "date": "2025-06-03",
  "lang": "en"
}`,
    },
  ],

}



//
</script>
<style scoped lang="postcss"></style>