<template>
  <!-- 
    Prompt: 创建一个展示AI工具卡片网格的组件，每个卡片包含图标和名称。
    布局采用响应式网格，支持自定义样式注入，遵循Headless组件模式。
    
    组件说明: 
    AIToolsGrid是一个可复用的网格布局组件，用于展示AI相关工具或服务。
    支持通过class属性自定义样式，内部使用Tailwind实现响应式布局。
  -->

  <!-- 主容器：响应式网格布局 -->
  <div class="container" v-if="data">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8  space-y-4 ">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">📚{{ t('handbook') }}</h1>
      <div class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{{ t('handbookDesc') }}</div>
    </div>
    <div :class="cn('grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] p-8 gap-4', props.class)">
      <template v-for="book in data.books" :key="book.name">
        <NuxtLink :to="`/${locale}/handbook/${book.name}`" class="underline text-green-500">
          <div>
            <!-- <div :class="cn('grid grid-cols-[repeat(3,1fr)] gap-4', props.class)"> -->
            <!-- 工具卡片循环 -->
            <div
              class="flex items-center gap-3 p-4  rounded-lg bg-amber-200/30 shadow-sm hover:shadow-md transition-shadow">
              <!-- 工具图标 -->
              <img :src="book.icon" :alt="book.name" class="w-12 h-12 rounded-full object-cover" />
              <!-- 工具名称 -->
              <span :to="`/${locale}/handbook/${book.name}`" class="underline text-green-500">{{ book.name }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </template>
    </div>

  </div>

</template>

<script setup lang="ts">
import { onMounted, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { queryCollection, useAsyncData, useHead, useI18n } from '#imports'
const { t, locale } = useI18n()


useHead({
  title: t('handbook')
})

// 组件属性接口
interface Props {
  class?: HTMLAttributes['class']
}

// 定义组件属性
const props = defineProps<Props>()

const { data, } = useAsyncData('nav.json', () => queryCollection('handbookNav').first())
onMounted(() => {
  console.log('data.value', data.value)

})



</script>