<!--<template>-->
<!--  <span v-if="method !== 'GraphQL'" :class="badgeClasses">-->
<!--      {{ method }}-->

<template>
  <span >
    <span  :class="badgeClasses">
      {{ method }}
    </span>

  </span>
</template>
<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import type {HttpMethodStr} from "~/utils/api/desc";

type HttpMethod = HttpMethodStr

const props = withDefaults(defineProps<{
  method: HttpMethod
  class?: HTMLAttributes['class']
}>(), {
  class: undefined
})

const methodColors: Record<HttpMethod, { bg: string, text: string }> = {
  GET: { bg: 'bg-green-500', text: 'text-white' },
  POST: { bg: 'bg-blue-500', text: 'text-white' },
  PUT: { bg: 'bg-yellow-500', text: 'text-black' },
  PATCH: { bg: 'bg-orange-500', text: 'text-white' },
  DELETE: { bg: 'bg-red-500', text: 'text-white' },
  OPTIONS: { bg: 'bg-purple-500', text: 'text-white' },
  HEAD: { bg: 'bg-cyan-500', text: 'text-black' },
  TRACE: { bg: 'bg-indigo-500', text: 'text-white' },
  CONNECT: { bg: 'bg-pink-500', text: 'text-white' },
}

const badgeClasses = computed(() => {
  const { bg, text } = methodColors[props.method]
  return cn(
      'inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded',
      bg,
      text,
      props.class
  )
})
</script>