<script setup lang="ts">

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { showError, useAsyncData, useHead, useI18n, useSeoMeta } from '#imports';
import { useHandbook } from '~/composables/handbook';
import ArticleNotFound from "./ArticleNotFound.vue";

const { locale } = useI18n()

const { data } = await useAsyncData('handbook-article', () => useHandbook(locale.value))
if (!data.value) showError({ statusCode: 404 })
const doc = computed(() => data.value?.markdownItem)

useHead({
  title: doc.value?.title,
  titleTemplate: (title) => `${title}`
})
useSeoMeta({
  description: doc.value?.description
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
    'flex-1 transition-all duration-300 overflow-auto border rounded-lg',
    props.class
  )">
    <!-- 内容展示区 -->
    <div class="p-6">
      <h1 class="mb-8 text-2xl font-semibold w-full text-center"> {{ doc?.title }}</h1>
      <hr>
      <ContentRenderer v-if="doc" :value="doc" class="prose"></ContentRenderer>
      <ArticleNotFound v-else />
    </div>
    <!-- 上一篇/下一篇 -->



  </main>
</template>
