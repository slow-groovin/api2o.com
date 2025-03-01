<template>
  <div class="online-request-container">
    <div class="italic mb-4  ml-4 font-extralight text-gray-500">
      {{ sample.desc }}
    </div>

    <div class="flex flex-row  items-center gap-2">
      <button @click="sendRequest()"
        class="p-2 w-16 flex items-center justify-center  bg-[hsl(320,95%,43%)] outline-4 outline-ring active:outline   text-white rounded "
        :disabled="pending">
        <LoadingAnimSvg v-if="pending" />

        <SendRequestIconSvg v-else class="text-white" />
      </button>

      <Input id="url" :model-value="apiBaseUrl + endpoint" disabled type="text" placeholder="Enter URL" />

      <Button @click="reset()" class="w-fit bg-gray-600"> Reset</Button>

    </div>
    <div class="flex flex-row mt-2 gap-4 ">

    </div>


    <div class="flex flex-row gap-2 mt-2">

      <div class="w-1/4" v-if="body != undefined">

        <h3>Request Body:</h3>
        <Textarea v-model="body" class="max-h-[50vh]" :style="textAreaHeightStyle">

        </Textarea>
      </div>

      <div class="w-3/4 max-w-[75vw]">
        <h3>Response:</h3>
        <div v-html="responseBodyHtml" class="max-h-[100vh] overflow-y-auto" style="--custom-code-padding-t: 1rem" />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Input } from '~/components/ui/input';
import { type GraphqlReqSample, } from "~/lib/models/api-request";
import { useRuntimeConfig } from '#app';
import { codeToHtml } from 'shiki';
import LoadingAnimSvg from "~/components/svg/LoadingAnimSvg.vue";
import SendRequestIconSvg from "~/components/svg/SendRequestIconSvg.vue";
import { Textarea } from "~/components/ui/textarea";
import { debounce } from "~/lib/common-utils";


const prop = withDefaults(defineProps<{ sample: GraphqlReqSample, endpoint: string }>(), {
  sample: {
    title: "posts",
    desc: "批量查询posts",
    body: `
query{
    post(id: 55){
        id
        userId
        user{
            username
            id
            email
            website
        }
    }
}`,
  },
  endpoint: ''
})

const { public: { apiBaseUrl } } = useRuntimeConfig()


const body = ref(prop.sample.body)

const textAreaHeightStyle = computed(() => {
  const bodyLen = body.value.split('\n').length
  return `height: ${bodyLen + 5}em`
})
const blankBodyHtml = await codeToHtml('\n\n\n', { lang: 'json', theme: 'github-dark' })
const responseBodyHtml = ref(blankBodyHtml)

const pending = ref(false)

/**
 * 页面发送请求的函数
 */
const sendRequest = debounce(async () => {
  pending.value = true
  responseBodyHtml.value = blankBodyHtml
  try {
    const res = await $fetch(apiBaseUrl + prop.endpoint, buildReqOpts())
    console.log(res, typeof res)
    responseBodyHtml.value = await codeToHtml(typeof res === 'object' ? JSON.stringify(res, null, 2) : res as string, {
      lang: 'json',
      theme: 'github-dark'
    })
  } catch (error) {
    console.log("some error happens in req event", error)
    responseBodyHtml.value = `Error: ${error}`
  }
  pending.value = false
}, 1000)


async function reset() {
  body.value = prop.sample.body
  responseBodyHtml.value = blankBodyHtml
}


/**
 * 构建请的opts
 */
function buildReqOpts() {
  const opts: any = {
    method: 'post',
    headers: {
      ...{
        'Content-Type': 'application/json',
      },
    },
  }
  opts.body = JSON.stringify({
    query: body.value
  })
  return opts
}
</script>

<style scoped lang="postcss">
h3 {
  @apply font-bold text-primary
}
</style>