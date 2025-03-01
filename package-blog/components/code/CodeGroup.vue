<template>
  <div class="border  rounded-sm overflow-hidden bg-neutral-400 text-white" >
    <!-- Tab buttons -->
    <div class="flex   gap-x-2 px-2">
      <button
          v-for="(block, index) in codeBlocks"
          :key="index"
          @click="activeIndex = index"
          class=" py-2 px-1 rounded-t font-mono text-sm  transition duration-150 ease-in-out border-b-2"
          :class="activeIndex === index ? 'bg-neutral-700/65 font-bold border-b-white' : 'text-black hover:bg-neutral-700 hover:text-white border-slate-300'"
      >
        {{ block.fileName }}
      </button>
    </div>

    <!-- Code blocks -->
    <div class="relative">
      <div
          v-for="(block, index) in codeBlocks"
          :key="index"
          v-show="activeIndex === index"
          class="w-full transition-opacity duration-300 ease-in-out"
          :class='{"show-line-number":block.showLineNumber}'
      >
<!--        copy buttons left&right-->
        <div class="absolute top-0 right-0 flex items-center justify-end px-4 py-2 text-neutral-400">
          <CopyButton :value="block.code" class="w-6 h-6"/>
        </div>
        <div class="absolute top-0 left-0 flex items-center justify-end px-4 py-2 text-neutral-400">
          <CopyButton :value="block.code" class="w-6 h-6"/>
        </div>

        <div class="">
          <div v-html="htmls[index]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CopyButton from "~/components/code/CopyButton.vue";
import {codeToHtml} from 'shiki'

interface CodeBlock {
  fileName: string;
  code: string;
  lang: string;
  html?: string;
  showLineNumber?: boolean,
}

const htmls:string[]=[]

interface Props {
  codeBlocks: CodeBlock[];
}

const props = defineProps<Props>();
for (const block of props.codeBlocks) {
  block.showLineNumber=block.showLineNumber??true
  let items = await codeToHtml(block.code, {
    lang: block.lang,
    theme: 'slack-dark'
  });
  htmls.push(items)
}
const activeIndex = ref(0);


const copyCode = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    // You could add a toast notification here
    console.log('Code copied to clipboard');
    console.log(code)
  }).catch((err) => {
    console.error('Failed to copy code: ', err);
  });
};
</script>