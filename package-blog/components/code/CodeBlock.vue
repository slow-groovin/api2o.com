<template>
  <div class="relative border rounded-lg overflow-hidden bg-neutral-400" :class='{"show-line-number":showLineNumber}'>
<!--    title area-->
    <div class="flex items-center justify-between   px-4 py-2" v-if="fileName">
      <span class=" font-mono text-sm">{{ fileName }}</span>
    </div>


    <div class="relative overflow-x-auto ">
      <button
          @click="copyCode"
          class="absolute text-gray-50 right-0 top-0.5 rounded focus:outline-none active:outline-white"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
      <div ref="code-content" v-html="html" class=""/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {codeToHtml} from "shiki";

interface Props {
  fileName?: string;
  code: string;
  lang?:string;
  showLineNumber?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  code: 'console.log("hello,world")\nconst a=54321',
  lang: 'shell',
  showLineNumber: true,
});
const html =await codeToHtml(props.code, {
  lang: props.lang,
  theme: 'slack-dark'
})

const codeContent= useTemplateRef<HTMLDivElement>('code-content')

const copyCode = () => {
  const content = codeContent.value?.textContent;
  if (content) {
    navigator.clipboard.writeText(content).then(() => {
    }).catch((err) => {
      console.error('Failed to copy code: ', err);
    });
  }
};

</script>