<template>
  <nav v-if="data" :class="cn(
    'overflow-y-auto w-full flex-shrink-0 rounded-sm  ',
    props.class
  )">
    <!-- 手册标题 -->
    <h1 class="text-lg font-semibold rounded-t  py-1 px-4 text-white bg-green-500/90">
      <NuxtLink :to="'/' + locale + '/handbook/' + data.book">
        📚 {{ data.book }}
      </NuxtLink>
    </h1>

    <!-- 章节列表 -->
    <ul class="space-y-4 border-r border-l">
      <!-- group -->
      <div v-for="group in data.chapterGroups" :key="group.name">
        <div class="font-extralight text-illustration-light ">{{ group.name }}</div>
        <div class="flex flex-col">
          <NuxtLink v-for="chapter in group.chapters" :key="chapter.name" :to="chapter.path" :title="chapter.name"
            :class="{ 'bg-primary/30 border-l border-l-primary': route.path === chapter.path }"
            class="border-b border-t text-sm pl-2 py-3 mt-[-1px] text-gray-500 text-ellipsis max-w-64 text-nowrap overflow-x-hidden thinner ">
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
<style scoped>
.thinner {
  letter-spacing: -0.05rem;
}
</style>