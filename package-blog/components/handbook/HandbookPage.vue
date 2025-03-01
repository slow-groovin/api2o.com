<script setup lang="ts">
/**
 * Prompt: 开发一个类似Rust和PostgreSQL教程的handbook组件,具有左侧目录导航和右侧内容区域的布局。
 * 组件需要支持响应式设计,并能够展示层级化的目录结构和详细的内容。
 * 
 * 这是一个headless的handbook组件,提供了基础的布局结构和交互逻辑,
 * 支持通过props自定义样式,适用于构建在线教程、文档等内容展示系统。
 */

import { computed, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from "@/utils/shadcn"
import type { ParsedContent } from '@nuxt/content'

// import type { HandbookOutLine } from '~/utils/model/hanbook'
import HandbookOutlineComponent from './HandbookOutlineComponent.vue'
import CollapseSidebar from '../container/CollapseSidebar.vue'
import type { HandbookChapterGroup, HandbookChapter, HandbookOutLine } from '~/utils/model/hanbook'
import { isHandbookChapterGroup } from '~/utils/model/hanbook'
import path from 'node:path';

//example: [ "debug", "first" ]
const { articlePathArr, bookPath, bookName } = useHandbookPath()
const { t } = useI18n()

interface Props {
  // 手册大纲数据
  outlineData?: HandbookOutLine | null
  // 当前页面内容
  pageData?: ParsedContent | null
  // 自定义class
  class?: HTMLAttributes['class']
  // 内容区域class
  contentClass?: HTMLAttributes['class']
  // 侧边栏class
  sidebarClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  contentClass: '',
  sidebarClass: ''
})

// 侧边栏状态
const isSidebarOpen = ref(true)





// 遮罩层类名
const overlayClass = computed(() => {
  return cn(
    'inset-0 bg-black/50 z-30 lg:hidden',
    isSidebarOpen.value ? 'block' : 'hidden'
  )
})

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const prevAndNext = computed(() => getPrevNextArticles(articlePathArr, props.outlineData))

useHead({
  title: prevAndNext.value.current?.name,
  titleTemplate: (title)=>`${title} | ${bookName}`
})
/**
 * 找到上一篇和下一篇文章
 * @param articlePathArr 
 * @param outlineData 
 */
function getPrevNextArticles(articlePathArr: string[], outlineData: HandbookOutLine | null | undefined): { prev?: { path: string, name: string },current?: { path: string, name: string }, next?: { path: string, name: string } } {
  if (!outlineData || !outlineData.chapters) {
    return {}
  }

  let articlesPaths: string[] = []
  let articleNames: string[] = []
  for (const c of outlineData.chapters) {
    if (isHandbookChapterGroup(c)) {
      articlesPaths.push(...c.chapters.map(sc => sc.path))
      articleNames.push(...c.chapters.map(sc => sc.name))
    } else {
      articlesPaths.push(c.path)
      articleNames.push(c.name)
    }
  }

  const currentArticleIndex = articlesPaths.findIndex(path => {
    return path === articlePathArr.join('/')
  })

  let result: ReturnType<typeof getPrevNextArticles> = {}
  if(currentArticleIndex===-1){
    return result
  }

  result.current={
    path:articlesPaths[currentArticleIndex],
    name:articleNames[currentArticleIndex]
  }
  if (currentArticleIndex > 0) {
    result.prev = {
      path: articlesPaths[currentArticleIndex - 1],
      name: articleNames[currentArticleIndex - 1]
    }
  }
  if (currentArticleIndex < articlesPaths.length - 1) {
    result.next = {
      path: articlesPaths[currentArticleIndex + 1],
      name: articleNames[currentArticleIndex + 1]
    }
  }

  return result
}
</script>

<template>
  <div :class="cn(
    'flex w-full min-h-screen relative',
    'max-md:flex-col',
    props.class
  )">
    <!-- 遮罩层 -->
    <div :class="overlayClass" @click="toggleSidebar"></div>

    <!-- 侧边栏 -->
    <CollapseSidebar :isOpen="isSidebarOpen" :class="cn(
      'md:sticky md:h-screen top-16 left-0',
      'max-md:w-full'
    )">
      <HandbookOutlineComponent v-if="outlineData" :outline-data="outlineData" />
    </CollapseSidebar>

    <!-- 内容区域 -->
    <main :class="cn(
      'flex-1 transition-all duration-300 overflow-auto',
      props.contentClass
    )">
      <!-- 内容展示区 -->
      <div class="p-6">
        <ContentRenderer v-if="pageData" :value="pageData" class="prose"></ContentRenderer>
        <!-- <div class="h-[300vh] w-full bg-green-100"></div> -->
      </div>
      <!-- 上一篇/下一篇 -->



      <!-- 上一篇/下一篇 按钮 -->
      <div class="flex justify-between p-6 border-t">
        <div v-if="prevAndNext.prev">
          <NuxtLink :to="bookPath + prevAndNext.prev?.path" class="text-blue-500 hover:underline">
            {{ t('previous') }}: {{ prevAndNext.prev.name }}
          </NuxtLink>
        </div>
        <div v-else>
          <div class="text-gray-500 ">
            {{ t('noPrevious') }}
          </div>
        </div>
        <div v-if="prevAndNext.next">
          <NuxtLink :to="bookPath + prevAndNext.next.path" class="text-blue-500 hover:underline">
            {{ t('next') }}: {{ prevAndNext.next.name }}
          </NuxtLink>
        </div>
        <div v-else>
          <div class="text-gray-500 ">
            {{ t('noNext') }}
          </div>
        </div>
      </div>

    </main>


  </div>
</template>
