<template>
  <div class="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
    <div class=" mx-auto">
      <div class="shadow-lg shadow-primary border rounded-lg overflow-hidden">
        <!-- 标题区域 -->
        <div class="  px-6 py-4">
          <h1 class="text-2xl font-bold">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="inline">
              <g class="">
                <path
                  d="M40 20 C40 17 38 14 34 13 C35 12 35 12 35 11 C23 5 30 0 5 0 C20 0 0 1 14 4 C13 3 12 3 10 3 C7 3 4 6 4 9 C4 10 5 11 5 11 C2 12 0 15 0 19 C0 22 2 25 5 26 C5 27 5 27 5 28 C5 34 10 39 16 39 C20 39 23 38 25 35 C26 36 27 36 32 36 C35 35 35 35 29 34 C28 37 40 24 40 20 Z"
                  fill="white" class=""></path>
                <path d="M15 15 L24 21 L33 13 C33 5 3 12 33 7 C33 6 29 1 23 1 C20 1 17 3 15 5 L14 13 L15 17 Z"
                  fill="#FED10A" class=""></path>
                <path d="M6 26 C6 27 6 27 6 28 C6 33 10 38 16 38 C19 24 22 36 24 34 L26 26 L24 22 L15 18 L6 26 Z"
                  fill="#24BBB1" class=""></path>
                <path d="M6 11 L12 12 L13 5 C13 5 12 4 11 4 C8 4 6 7 6 9 C6 10 6 10 6 11 Z" fill="#EF5098" class="">
                </path>
                <path d="M6 12 C3 13 1 16 1 19 C1 21 3 24 5 25 L14 17 L12 14 L6 12 Z" fill="#1BA9F5" class=""></path>
                <path d="M26 34 C27 34 28 35 29 35 C31 35 30 33 33 29 C33 29 33 28 33 28 L27 27 L26 34 Z" fill="#93883E"
                  class=""></path>
                <path d="M27 25 L34 27 C36 12 38 23 38 20 C38 18 36 15 34 14 L25 22 L27 25 Z" fill="#0077CC" class="">
                </path>
              </g>
            </svg>

            {{ i18nVal('title') }}

          </h1>
          <!--          徽章区域-->
          <div class="m-1 flex gap-2">

            <!--            <UncompletedBadge/>-->
            <OfflineBadge />
            <GithubSourceLink relativepath="pages/tool/object-id-parser.vue" class="text-sm" />

          </div>

          <!--          说明区域-->
          <span>
            <span class="mt-2 italic font-light ">
              {{ i18nVal('description') }}
            </span>
            <span class="prose ml-2">
              <a class="" href="https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-guide.html">
                Painless
              </a>
            </span>
          </span>


        </div>

        <!-- 上方代码输入框 -->
        <div class="p-6 border-y-4 border-[#FED10A]">
          <div class="flex flex-row  items-center">
            <label for="input-code" class="block text-sm font-medium  mb-2">
              Single Line Painless Script Code:
            </label>
            <div class="flex-1"></div>
            <div class="font-light ">
              Input Sample:
              <span v-for="(link, index) in sampleScripts" class="ml-1 underline text-blue-500 cursor-pointer"
                @click="oneLineCode = link">{{ index }}</span>
            </div>
          </div>


          <div class="flex flex-row items-start gap-x-1">
            <div class="italic font-extrabold text-[#FED10A]  w-fit  rounded select-none">"</div>
            <textarea id="input-code" v-model="oneLineCode" rows="3"
              class="w-full px-3 py-2  border rounded-lg focus:outline-none focus:border-blue-500 break-normal"
              :placeholder="i18nVal('placeholder')" />
            <div class="italic text-xl font-extrabold text-[#FED10A]  w-fit    rounded select-none">"</div>
          </div>


        </div>

        <!-- 格式化按钮 -->
        <div class="px-6 py-4  flex justify-around space-x-32">
          <Button @click="execOne2Multi"
            class="px-4 py-2  bg-[#FED10A] hover:bg-[#FED10A] text-gray-600 font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:ring-offset-1">
            ↓ {{ i18nVal('inlineFormat') }} ↓
          </Button>
          <Button @click="execMulti2One"
            class="px-4 py-2  bg-green-500  rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:ring-offset-1">
            ↑ {{ i18nVal('multilineFormat') }} ↑
          </Button>
        </div>

        <!-- 下方代码输出框 -->
        <div class="p-6 border-y-4 border-primary mb-4">
          <label for="output-code" class="block text-sm font-medium  mb-2">
            Multi Line Painless Script Code:
          </label>
          <div class="italic text-primary  w-fit p-1 pr-2 mb-1 rounded select-none">"source": """</div>
          <textarea id="output-code"
            class="focus:outline-none focus:border-blue-500 w-full px-3 py-2  border rounded-lg" v-model="multiLineCode"
            rows="8" :placeholder="i18nVal('placeholder')" />
          <div class="italic text-primary  w-fit p-1 pr-2  rounded select-none">"""</div>
        </div>
      </div>
    </div>



  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UncompletedBadge from "~/components/hint/badge/UncompletedBadge.vue";
import OfflineBadge from "~/components/hint/badge/OfflineBadge.vue";
// import {js_beautify} from 'js-beautify'
import { useI18n, useHead, useSeoMeta } from '#imports';
import GithubSourceLink from '~/components/hint/GithubSourceLink.vue';
declare global {
  interface Window {
    js_beautify: (arg1: string, opt: any) => string;
  }
}

useHead({
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify.min.js',
      async: true,
    }
  ]
})

// useScript('https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.4/beautify.min.js')
onMounted(() => {

})

const { t } = useI18n()
const i18nVal = (subKey: string) => t('tools.elastic-painless-script-format.' + subKey)
useSeoMeta({
  title: i18nVal('title'),
  description: i18nVal('description'),
})

const oneLineCode = ref('')
const multiLineCode = ref('')

function multi2one(codeLines: string) {
  return codeLines
    .replace(/"/g, "\\\"")
    .split(/\n/g)
    .map(line => line.trim())
    .join(' ');

}

function one2multi(oneLineCode: string) {
  return window.js_beautify(oneLineCode.replace(/\\"/g, '"'), {})
}

const execOne2Multi = () => {
  // 这里实现格式化逻辑
  multiLineCode.value = ''
  setTimeout(() => {
    multiLineCode.value = one2multi(oneLineCode.value)
  }, 50) //50ms延迟模拟一闪而过的效果

}

const execMulti2One = () => {
  // 这里实现反格式化逻辑
  oneLineCode.value = ''
  setTimeout(() => {
    oneLineCode.value = multi2one(multiLineCode.value)
  }, 50) //50ms延迟模拟一闪而过的效果
}


const sampleScripts = [
  'if(doc[\\\"organizationId\\\"].value == params.currentOrgId) { return doc[\\\"unitCost\\\"].value; } return doc[\\\"organizationId\\\"].value + params.adjustPrice;',

  'if (doc[\\\"category\\\"].value == "clothing") { return _score * 0.5; } else if (doc[\'category\'].value == "sports") { return doc[\\\"_score\\\"].value * 0.8; } else { return 0.1; }',

  'ctx._source.postingDate = ctx._source[\\"@timestamp\\"]; ctx._source.remove(\\"@timestamp\\");',

  'ctx._source.fieldA = ctx._source.fieldA.replace(params.patterns[0], params.replacements[0]); ctx._source.fieldB = ctx._source.fieldB.replace(params.patterns[1], params.replacements[1]);',

  'for (int j=0; j<params.removableItemsArrayA[0].length; j++) { if (ctx._source.fieldA.contains(params.removableItemsArrayA[0][j])) { ctx._source.fieldA.remove(ctx._source.fieldA.indexOf(params.removableItemsArrayA[0][j])); } } ctx._source.fieldA.addAll(params.newItemsArrayA[0]); for (int j=0; j<params.removableItemsArrayB[1].length; j++) { if (ctx._source.fieldB.contains(params.removableItemsArrayB[1][j])) { ctx._source.fieldB.remove(ctx._source.fieldB.indexOf(params.removableItemsArrayB[1][j])); } } ctx._source.fieldB.addAll(params.newItemsArrayB[1]);',

  'for (int j=0; j<params.itemsToRemoveArrayA[0].length; j++) { if (ctx._source.fieldA.contains(params.itemsToRemoveArrayA[0][j])) { ctx._source.fieldA.remove(ctx._source.fieldA.indexOf(params.itemsToRemoveArrayA[0][j])); } } for (int j=0; j<params.itemsToRemoveArrayB[1].length; j++) { if (ctx._source.fieldB.contains(params.itemsToRemoveArrayB[1][j])) { ctx._source.fieldB.remove(ctx._source.fieldB.indexOf(params.itemsToRemoveArrayB[1][j])); } }',

  'if (ctx._source.participants != null) { def targetParticipant = ctx._source.participants.find(entry -> entry[params.targetField.name] == params.targetField.value); if (targetParticipant != null) { for (key in params.updateFields.keySet()) { def newValue = params.updateFields[key]; if (targetParticipant[key] != null && targetParticipant[key] != newValue) { targetParticipant[key] = newValue; } } } }',

  'double totalScore = _score; int index = 0; int keywordCount = params.titleKeywords.size(); while (index < keywordCount) { String keyword = params.titleKeywords[index]; if (doc[\\"titleKeywords\\"].value.contains(keyword)) { totalScore = totalScore + _score; } index++; } return totalScore;'
];

</script>