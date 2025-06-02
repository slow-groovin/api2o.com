<template>
  <div class="cur-container p-8 ">
    <div class="flex flex-col gap-y-4">
      <div class="flex flex-row items-center flex-wrap">
        <GraphqlSvg class="w-8 h-8 mr-4 bg-pink-600 text-white p-1 font-bold rounded" />

        <h1 class="text-5xl font-semibold block">{{ desc.name }}</h1>
        <div class="ml-16 mr-4 flex flex-row gap-x-2 items-center font-semibold text-xl text-primary ">
          <CodeBlock id="endpoint" :code="apiBaseUrl + endpoint" lang="shell" :show-line-number="false"
            class="w-fit " />
        </div>
      </div>
      <blockquote>
        <slot name="before-desc" />
        {{ desc.desc }}
        <slot name="after-desc" />
      </blockquote>

      <hr class="mx-4">

      <ClientOnly>
        <div class="cur-block">
          <details :open="toggleOnlineRequestBuilderOpenRef">
            <summary><span class="inline-block">🌐{{ tPage.InPageReq }}</span></summary>
            <div>
              <GitHubStyleTabs :names="desc.samples.map(s => s.title)">
                <template v-for="s in desc.samples" #[s.title]>
                  <TryItBlock :sample="s" :endpoint="endpoint" />
                </template>
              </GitHubStyleTabs>
              <!--              <InPageRequestSender :req-sample="desc.sample"/>-->
            </div>

            <div class="flex text-lg font-normal border-dashed  p-2 border-2 gap-2 items-center">
              {{ tPage.toggleInPageReqOpenDefault }}:
              <Switch v-model:model-value="toggleOnlineRequestBuilderOpen" />
            </div>
          </details>
        </div>
      </ClientOnly>

      <div class="cur-block">
        <div class="flex flex-row items-center">
          <h2>🚀{{ tPage.def }}</h2>
        </div>

        <slot name="details-start-area" />

        <h2>{{ tPage.operations }}</h2>
        <div class="flex flex-col gap-4">
          <div v-for="op in desc.operations" class="flex flex-nowrap items-center gap-2 ">
            <GraphqlMethodBadge :type="op.type" class="px-1 py-0.5" />
            <div class="flex items-center px-2 py-1.5 rounded-lg shadow-lg">
              <div v-html="renderGraphQLType(op.content)"></div>
              <CopyButton :value="op.content" class="ml-2 w-6 h-6 text-muted-foreground bg-muted/50 border" />
            </div>
            <div v-if="op.annotation" class="ml-4 text-neutral-500 text-sm italic font-extralight">
              #{{ op.annotation }}
            </div>
          </div>

        </div>


        <h2>{{ tPage.types }}</h2>
        <CodeGroup :codeBlocks="types2CodeGroup(desc.types)" />


        <slot name="req-end-area" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type GraphqlReqDesc } from "~/lib/models/api-request";
import { Switch } from "~/components/ui/switch";
import { useLocalStorage } from "@vueuse/core"
import GraphqlMethodBadge from "~/components/api/GraphqlMethodBadge.vue";
import GraphqlSvg from "~/components/svg/GraphqlSvg.vue";
import CopyButton from "~/components/code/CopyButton.vue";
import GitHubStyleTabs from "~/components/container/GitHubStyleTabs.vue";
import TryItBlock from "~/components/api/graphql/TryItBlock.vue";
import { usePageScopedI18n } from "~/lib/i18n";
import { useRuntimeConfig } from '#imports';


const { public: { apiBaseUrl } } = useRuntimeConfig()


defineProps<{ desc: GraphqlReqDesc, endpoint: string }>()


function types2CodeGroup(items: { content: string, title: string }[]) {
  return items.map(item => ({
    fileName: item.title,
    code: item.content,
    lang: 'graphql'
  }))
}

const toggleOnlineRequestBuilderOpen = useLocalStorage('toggleOnlineRequestBuilderOpen', false)
const toggleOnlineRequestBuilderOpenRef = ref(toggleOnlineRequestBuilderOpen.value)
const { tPage } = usePageScopedI18n(
  {
    en: {
      InPageReq: 'Try It',
      def: 'Definition:',
      operations: 'operations:',
      types: 'types:',
      toggleInPageReqOpenDefault: 'open this by default',
    },
    zh: {
      InPageReq: 'Try It',
      def: '定义:',
      operations: '操作operations:',
      types: '类型types:',
      toggleInPageReqOpenDefault: '默认打开`Try it`页',
    }
  }
)

/**
 * 给我一个自定义的ts函数, 把文本comments(start:Int!, limit:Int!):[Comments!]分割
 * 分为多个部分
 * (之前的是name
 * (,)之间的是params
 * params以,分割出多个param
 * 每个param以:分割出key和val
 * )之后的:之后的[与]之间的是return
 * 渲染的颜色为
 * name: 208, 100%, 72%
 * key: 242, 51%, 61%
 * type: 36, 100%, 41%
 * 补充:
 *  ')' 和':'之间可能有空格, 如") :",")   :",, 所以不要直接使用):分割
 * val和return后面可能带!, 对'!'不要任何样式
 * return中把所有的英文单词进行格式化
 *
 * @param typeString
 */
function renderGraphQLType(typeString: string): string {
  const [name, paramsWithReturn] = typeString.split('(');
  const [params, returnType] = paramsWithReturn.split(/\s*\):\s*/);

  const formattedName = `<span style="color: hsl(208, 100%, 72%);">${name}</span>`;

  const formattedParams = params
    .slice(0, -1) // 去掉最后的')'
    .split(',')
    .map(param => {
      const [key, value] = param.trim().split(/:\s*/);
      return `<span style="color: hsl(242, 51%, 61%);">${key.trim()}:</span> <span style="color: hsl(36, 100%, 41%);">${value.trim().replace(/!$/, '')}</span>${value.trim().endsWith('!') ? '!' : ''}`;
    })
    .join(', ');

  // 处理 returnType，识别开头和结尾

  const formattedReturnType = returnType.replace(/(\w+)/g, `<span style="color: hsl(36, 100%, 41%);">$1</span>`).trim(); // 中间部分


  return `${formattedName}<span style="margin-left:0.25rem">(</span>${formattedParams}<span>)</span>: <span style="margin: 0 4px;">${formattedReturnType}</span>`;
}


</script>

<style scoped lang="postcss">
.cur-container {
  position: relative;
}

.cur-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 190px;
  background-image: url('/img/api/graphql-bg-pattern.png');
  opacity: 0.13;
  z-index: -1;
}

.cur-block {
  @apply border rounded-xl bg-github-card px-4 py-4;
}

h2 {
  @apply text-2xl font-bold my-4
}

#endpoint {
  --custom-code-padding-t: 0.5rem;
  --custom-code-padding-r: 2rem;
  --custom-code-padding-b: 0.5rem;
  --custom-code-padding-l: 0.5rem;
}
</style>