<template>
  <svg :class="cn('h-5 w-5 text-current', props.class)"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
  </svg>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ClassValue } from 'clsx'
import {cn} from '~/lib/utils'
interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()



</script>