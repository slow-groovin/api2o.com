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
        d="M5 13l4 4L19 7"
    />
  </svg>
</template>

<script setup lang="ts">
import {type HTMLAttributes } from 'vue'
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