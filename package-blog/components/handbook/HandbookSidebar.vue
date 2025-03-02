<template>
  <nav v-if="data" :class="cn(
    'overflow-y-auto w-full flex-shrink-0  ',
    props.class
  )">
    <!-- 手册标题 -->
    <h1 class="text-lg font-semibold rounded-t py-1 px-4 text-white bg-green-500/90">📖 {{ data.book }}</h1>

    <!-- 章节列表 -->
    <ul class="space-y-4 border-r">
      <!-- group -->
      <div v-for="group in data.chapterGroups" :key="group.name">
        <div class="font-extralight text-illustration-light ">{{ group.name }}</div>
        <div class="flex flex-col">
          <NuxtLink v-for="chapter in group.chapters" :key="chapter.name" :to="chapter.path"
            :class="{ 'bg-primary/30 border-l-4 border-l-primary': route.path === chapter.path }" class="border-b border-t pl-2 py-1 mt-[-1px] ">
            {{ chapter.name }}
          </Nuxtlink>
        </div>
      </div>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { useAsyncData, useI18n } from '#imports';
import type { HTMLAttributes } from 'vue';
import { useHandbookOutline } from '~/composables/handbook';
import { cn } from '@/lib/utils';
import { NuxtLink } from '#components';
import { useRoute } from 'vue-router';

const props = defineProps<{
  class: HTMLAttributes['class']
}>()
const { locale } = useI18n()
const { data } = useAsyncData('handbook-outline', () => useHandbookOutline(locale.value))
const route = useRoute()
</script>