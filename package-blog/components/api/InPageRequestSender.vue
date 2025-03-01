<template>
  <div class="online-request-container">
    <div class="flex flex-row  items-center">

      <Input id="url" v-model="url"  type="text" placeholder="Enter URL" class=""/>

    </div>
    <div class="flex flex-row mt-2 gap-4 ">
      <Button @click="sendRequest()" class="flex-1" :disabled="pending" >{{pending?"...":reqSample.method}}</Button>
      <Button @click="reset()" class="w-fit bg-gray-600"> Reset</Button>
    </div>


    <div class="flex flex-row gap-2 mt-2">

      <div class="w-1/2" v-if="body!=undefined">

        <h3>Request Body:</h3>
        <Textarea v-model="body" class="max-h-[50vh]"  :style="textAreaHeightStyle">

        </Textarea>
      </div>

      <div class="w-1/2">
        <h3>Response:</h3>
        <div v-html="responseBodyHtml"/>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {RestReqSampleImpl, } from "~/lib/models/api-request";
import {Input} from '~/components/ui/input'

import {Textarea} from "~/components/ui/textarea";
import {debounce} from "~/lib/common-utils";
import { codeToHtml } from 'shiki';


onMounted(async()=>{
  blankBodyHtml=await codeToHtml('\n\n\n',{lang:'json',theme:'github-dark'})
  responseBodyHtml.value=blankBodyHtml
})

const prop = defineProps<{ reqSample: RestReqSampleImpl }>()
const url = ref(prop.reqSample.url)
const body = ref(typeof prop.reqSample.body==='object'?JSON.stringify(prop.reqSample.body,null,2):prop.reqSample.body)
const textAreaHeightStyle=computed(()=>{
  const bodyLen=body.value.split('\n').length
  return `height: ${bodyLen+5}em`
})
let blankBodyHtml=''

const responseBodyHtml = ref('')

const pending= ref(false)

/**
 * 页面发送请求的函数
 */
const sendRequest =debounce(async () => {
  pending.value=true
  responseBodyHtml.value=blankBodyHtml
  try {
    const res = await $fetch(url.value, buildReqOpts())
    console.log(res, typeof res)
    responseBodyHtml.value=await codeToHtml(typeof res==='object'?JSON.stringify(res,null,2):res as string,{lang:'json',theme:'github-dark'})
  } catch (error) {
    console.log("some error happens in req event",error)
    responseBodyHtml.value = `Error: ${error}`
  }
  pending.value=false
},1000)


async function reset(){
  url.value=prop.reqSample.url
  body.value=typeof prop.reqSample.body==='object'?JSON.stringify(prop.reqSample.body,null,2):prop.reqSample.body
  responseBodyHtml.value=blankBodyHtml
}


/**
 * 构建请的opts
 */
function buildReqOpts(){
  const opts:any={
    method: prop.reqSample.method,
    headers: {
      ...{
        'Content-Type': 'application/json',
      },
      ...prop.reqSample.headers,
    },
  }
  const methodsWithBody = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if(methodsWithBody.includes(prop.reqSample.method) && body.value!=undefined){
    opts.body=body.value
  }
  return opts
}
</script>

<style scoped lang="postcss">
h3{
  @apply font-bold text-primary
}
</style>