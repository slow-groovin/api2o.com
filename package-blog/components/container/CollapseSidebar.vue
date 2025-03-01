<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed, ref } from 'vue'
import type { HTMLAttributes } from 'vue'

interface Props {
  // 侧边栏是否打开
  isOpen?: boolean
  // 自定义class
  class?: HTMLAttributes['class']
  // 侧边栏内容class
  contentClass?: HTMLAttributes['class']
  // 整体宽度是否随状态变化
  responsive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: true,
  class: '',
  contentClass: '',
})

const isSidebarOpen = ref(props.isOpen)

// 侧边栏内容类名
const sidebarContentClass = computed(() => {
  return cn(
    'transition-transform duration-300',
    !isSidebarOpen.value && '-translate-x-full',
  )
})

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <aside :class="cn(
    'transition-all duration-300',
    'border-r border-gray-200',
    'w-64',
    !isSidebarOpen && 'border-r-0',
    props.class
  )">
    <!-- 控制菜单按钮 -->
    <div class="flex flex-row justify-end rounded-md " :class="cn(
      isSidebarOpen && 'w-full',
      !isSidebarOpen && 'w-fit',
    )">
      <button class="top-4 left-4 z-50 rounded-md border-amber-100/30" @click="toggleSidebar">
        <span class="sr-only">Toggle sidebar</span>
        <div class="flex items-center justify-center">
          <Icon v-if="isSidebarOpen" name="ri:expand-left-line" class="w-4 h-4 underline  hover:border text-gray-400 rounded " mode="svg"/>
          <Icon v-else name="mingcute:menu-fill" class="m-1 w-6 h-6 p-1 underline  border hover:bg-gray-200 rounded " mode="svg"/>
        </div>
      </button>

    </div>



    <div :class="sidebarContentClass">
      <slot></slot>
    </div>
  </aside>
</template>
