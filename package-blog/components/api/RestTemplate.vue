<template>
  <div class="cur-container p-8">
    <div class="flex flex-col gap-y-4">
      <div class="flex flex-row items-center flex-wrap">
        <h1 class="text-5xl font-semibold">{{ desc.name }}</h1>
        <div class="ml-16 mr-4 flex flex-row gap-x-2 items-center font-semibold text-xl text-primary ">
          <HttpMethodBadge v-for="method in desc.methods" :method="method" class="text-xl"/>
        </div>
        <CodeBlock id="endpoint" :code="desc.sample.url" lang="shell" :show-line-number="false" class="w-fit "/>
      </div>
      <blockquote>
        <slot name="before-desc"/>
        {{ desc.desc }}
        <slot name="desc"/>
      </blockquote>

      <hr class="mx-4">

      <ClientOnly>
        <div class="cur-block">
          <details :open="toggleOnlineRequestBuilderOpenRef">


            <summary ><span class="inline-block">🌐{{ curI18n('InPageReq') }}</span></summary>
            <div >
              <InPageRequestSender :req-sample="desc.sample"/>
            </div>

            <div class="flex text-lg font-normal border-dashed  p-2 border-2 gap-2 items-center">
              {{ curI18n('toggleInPageReqOpenDefault') }}:
              <Switch  v-model:checked="toggleOnlineRequestBuilderOpen"/>
            </div>
          </details>
        </div>
      </ClientOnly>

      <div class="cur-block">
        <div class="flex flex-row items-center">
          <h2>🚀{{ curI18n('request') }}</h2>
        </div>

        <slot name="req-start-area"/>

        <h2>{{ curI18n('sampleCode') }}</h2>
        <CodeGroup :codeBlocks="codeGroup"/>

        <h2>
          {{ curI18n('bodyParam') }}

        </h2>
        <div class="flex text-lg font-normal border-dashed  p-2 border-2 gap-2 items-center">
          {{ curI18n('showDescAnno') }}:
          <Switch id="airplane-mode" v-model:checked="toggleDescAnnotation"/>
        </div>

        <div v-if="desc.paramOrBodyDescList && desc.paramOrBodyDescList.length>0">
          <CodeGroup v-show="!toggleDescAnnotation" :code-blocks="bodyDescToCodeGroup(desc.paramOrBodyDescList)"
                     :show-line-number="false"/>
          <CodeGroup v-show="toggleDescAnnotation" :code-blocks="bodyDescWithAnnoToCodeGroup(desc.paramOrBodyDescList)"
                     :show-line-number="false"/>
        </div>
        <div v-else class="p-2 border">
          {{curI18n('none')}}
        </div>
        <slot name="req-end-area"/>
      </div>
      <div class="cur-block">
        <h2>🖨{{ curI18n('response') }}</h2>
        <slot name="res-start-area"/>

        <h2>{{ curI18n('responseBody') }}</h2>
        <div class="flex text-lg font-normal border-dashed  p-2 border-2 gap-2 items-center">
          {{ curI18n('showDescAnno') }}:
          <Switch id="airplane-mode" v-model:checked="toggleDescAnnotation"/>
        </div>
        <CodeGroup v-show="!toggleDescAnnotation" :code-blocks="bodyDescToCodeGroup(desc.responseBodyDescList)"
                   :show-line-number="false"/>
        <CodeGroup v-show="toggleDescAnnotation" :code-blocks="bodyDescWithAnnoToCodeGroup(desc.responseBodyDescList)"
                   :show-line-number="false"/>

        <slot name="res-end-area"/>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {convertHttpRequest} from "~/lib/request-gen";
import {type BodyItemDesc, type RestReqDesc} from "~/lib/models/api-request";
import {Switch} from "~/components/ui/switch";
import InPageRequestSender from "~/components/api/InPageRequestSender.vue"
import {useLocalStorage} from "@vueuse/core"
import HttpMethodBadge from "~/components/api/HttpMethodBadge.vue";
import { useI18n } from '#imports';
import CodeGroup from '../code/CodeGroup.vue';


const {locale} = useI18n()
const props = defineProps<{
  desc: RestReqDesc
}>();


const toggleDescAnnotation = ref(true)
const toggleOnlineRequestBuilderOpen=useLocalStorage('toggleOnlineRequestBuilderOpen',false)
const toggleOnlineRequestBuilderOpenRef=ref(toggleOnlineRequestBuilderOpen.value)

const translations: Record<Language, Record<string, string>> = {
  en: {
    request: 'Request',
    sampleCode: 'request code:',
    bodyParam: 'body/param sample:',
    response: 'Response',
    responseBody: 'response body sample:',
    responseDescription: 'response description:',
    showDescAnno: 'show annotations',
    InPageReq:'Try it',
    toggleInPageReqOpenDefault:'open this by default',
    none:'none',
  },
  zh: {
    request: '请求',
    sampleCode: '请求代码:',
    bodyParam: '请求body/参数示例:',
    response: '响应',
    responseBody: '响应body示例:',
    responseDescription: '响应说明:',
    showDescAnno: '显示内容说明',
    InPageReq:'Try it',
    toggleInPageReqOpenDefault:'默认打开在线请求页',
    none:'无'
  }
};

type Language = 'en' | 'zh';

function curI18n(key: string): string {
  let finalLang: Language = 'en'
  const lang=locale.value
  if (lang === 'en' || lang === 'zh') {
    finalLang = lang
  }
  return (translations[finalLang][key] || translations['en'][key] )|| key;
}


const codeGroup = convertHttpRequest(props.desc.sample);

function bodyDescToCodeGroup(samples: BodyItemDesc[]) {
  return samples.map(sample => {
    return {
      fileName: sample.title,
      code: sample.content,
      lang: 'json'
    }
  })
}

function bodyDescWithAnnoToCodeGroup(samples: BodyItemDesc[]) {
  return samples.map(sample => {
    return {
      fileName: sample.title,
      code: sample.contentWithAnnotation,
      lang: 'js'
    }
  })
}

</script>

<style scoped lang="postcss">
.cur-container {
  background-image: url("data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgMTAgMTAiPgogICAgICAgIDxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDg2LCA4NiwgODYsIDAuMikiIC8+CiAgICA8L3N2Zz4=");
  background-size: 10px 10px
}

.cur-block {
  @apply border rounded-xl bg-github-card px-4 py-4
}

h2 {
  @apply text-2xl font-bold my-4
}

#endpoint{
  --custom-code-padding-t: 0.5rem;
  --custom-code-padding-r: 2rem;
  --custom-code-padding-b: 0.5rem;
  --custom-code-padding-l: 0.5rem;
}
</style>