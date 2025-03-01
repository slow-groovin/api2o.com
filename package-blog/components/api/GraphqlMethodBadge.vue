<template>
  <div :class="badgeClasses" class="">
    {{ type }}
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import type {GraphqlOpTypeStr} from "~/lib/models/api-request";


const props = withDefaults(defineProps<{
  type: GraphqlOpTypeStr
  class?: HTMLAttributes['class']
}>(), {
  class: undefined
})

const operationColors: Record<GraphqlOpTypeStr, { bg: string, text: string }> = {
  query: { bg: 'bg-pink-500', text: 'text-white' },
  mutation: { bg: 'bg-pink-500', text: 'text-white' },
  // Subscription: { bg: 'bg-purple-500', text: 'text-white' },
}

const badgeClasses = computed(() => {
  const { bg, text } = operationColors[props.type]
  return cn(
      ' px-2 py-1 text-xs font-bold rounded',
      bg,
      text,
      props.class
  )
})
</script>