<script setup lang="ts">

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import BlogFooter from '~/components/blog/BlogFooter.vue';
import { useAsyncData, useHead, useI18n } from '#imports';
import { useHandbook } from '~/composables/handbook';
import ArticleNotFound from "./ArticleNotFound.vue";


//example: [ "debug", "first" ]
const { t, locale } = useI18n()

const { data } = await useAsyncData('handbook-article', () => useHandbook(locale.value))
const doc = computed(() => data.value?.markdownItem)
const next = computed(() => data.value?.next)
const previous = computed(() => data.value?.previous)
useHead({
  title: doc.value?.title,
  titleTemplate: (title) => `${title}`
})


interface Props {

  // 自定义class
  class?: HTMLAttributes['class']

}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})


</script>

<template>
  <!-- 内容区域 -->
  <main :class="cn(
    'flex-1 transition-all duration-300 overflow-auto',
    props.class
  )">
    <!-- 内容展示区 -->
    <div class="p-6">
      <ContentRenderer v-if="doc" :value="doc" class="prose"></ContentRenderer>
      <ArticleNotFound v-else />
      <!-- <div class="h-[300vh] w-full bg-green-100"></div> -->
    </div>
    <!-- 上一篇/下一篇 -->



    <!-- 上一篇/下一篇 按钮 -->
    <BlogFooter :next-article="next" :previous-article="previous" />



  </main>
</template>
