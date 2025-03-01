<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="cn('inline-block', props.class)"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
  >
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
interface Props {
  class?: HTMLAttributes['class']
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '1em',
  height: '1em'
})


</script>