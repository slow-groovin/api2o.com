<template>
  <div :class="containerClass">
    <div :class="tabListClass" role="tablist">
      <button
          v-for="(name, index) in names"
          :key="index"
          :class="tabClass(index === activeTab)"
          role="tab"
          :aria-selected="index === activeTab"
          @click="setActiveTab(index)"
      >
        {{ name }}
      </button>
    </div>
<!--    always render, bcz v-show -->
    <div :class="tabContentClass">
      <div  v-for="(name,index) in names"  v-show="activeTab===index">
        <slot :name="name"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import type {HTMLAttributes} from 'vue'
import {computed, ref} from 'vue'


interface Props {
  names: string[]
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const activeTab = ref(0)

const setActiveTab = (index: number) => {
  activeTab.value = index
}

const containerClass = computed(() =>
    cn('flex flex-col', props.class)
)

const tabListClass = computed(() =>
    cn('flex border-b border-gray-200')
)

const tabClass = (isActive: boolean) =>
    cn(
        'px-4 py-2 text-sm font-medium',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        isActive
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    )

const tabContentClass = computed(() =>
    cn('mt-4')
)
</script>