<script setup lang="tsx">
/**
 * Prompt: 修改handbook组件的大纲导航组件，移除HandbookChapter中的path字段，
 * 实现通过多级name计算得到每个章节的路径。
 * 
 * 这是一个headless的导航组件，提供了基础的目录结构渲染和交互逻辑，
 * 支持通过props自定义样式。组件设计遵循响应式原则，适配不同屏幕尺寸。
 */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { HTMLAttributes } from 'vue'
import { cn } from "@/utils/shadcn"
import type { HandbookOutLine, HandbookChapter, HandbookChapterGroup } from '~/utils/model/hanbook'

const route = useRoute()

interface Props {
  // 大纲数据
  outlineData?: HandbookOutLine | null
  // 自定义class
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const { bookPath } = useHandbookPath()

const isChapterGroup = (chapter: HandbookChapter | HandbookChapterGroup): chapter is HandbookChapterGroup => {
  return 'chapters' in chapter
}

const getChapterPath = (articlePath: string): string => {
  return bookPath + articlePath
}

const isActiveChapter = (path: string): boolean => {
  return route.path ===getChapterPath(path)
}



const renderChapters = (chapters: (HandbookChapterGroup | HandbookChapter)[]) => {
  return chapters.map((chapter) => {

    if (isChapterGroup(chapter)) {
      return (
        <li key={chapter.name} class="space-y-2">
          <h2 class="pl-1 font-light">{chapter.name}</h2>
          <ul class="">
            {renderChapters(chapter.chapters)}
          </ul>
        </li>
      )
    } else {
      return (
        <li key={chapter.name}>
          <router-link
            to={getChapterPath(chapter.path)}
            class={cn(
              'block py-1 pl-4 border-b border-t',
              isActiveChapter(chapter.path)
                ? 'border-l-4 bg-primary/30 border-l-primary'
                : ''
            )}
          >
            {chapter.name}
          </router-link>
        </li>
      )
    }
  })
}
</script>

<template>
  <nav v-if="outlineData" :class="cn(
    'overflow-y-auto w-full flex-shrink-0',
    props.class
  )">
    <div class="rounded-lg p-0.5">
      <!-- 手册标题 -->
      <h1 class="text-xl font-bold mb-4 rounded-t-lg py-2 px-4 text-white bg-green-500">📖   {{ outlineData.name }}</h1>

      <!-- 章节列表 -->
      <ul class="space-y-2">
        <template v-for="chapter in outlineData.chapters" :key="chapter.name">
          <!-- 使用递归函数渲染章节 -->
          <component :is="renderChapters([chapter])[0]" />
        </template>
      </ul>
    </div>
  </nav>
</template>
