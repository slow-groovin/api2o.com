<template>
  <button
      :class="buttonClass"
      @click="copyToClipboard"
      :disabled="isDisabled"
  >
    <slot>
      <CopySvg v-if="!isCopied" class=""/>
      <CopiedSvg v-else></CopiedSvg>
    </slot>
  </button>
</template>

<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {computed, ref} from 'vue'
import CopySvg from "~/components/svg/CopySvg.vue";
import CopiedSvg from "~/components/svg/CopiedSvg.vue";
import { cn } from '@/lib/utils';
type ClassValue = string | string[] | Record<string, boolean>

interface Props {
  value: string
  class?: HTMLAttributes['class']
  duration?: number
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  isDisabled: false
})

const emit = defineEmits<{
  (e: 'copy', value: string): void
  (e: 'copied'): void
  (e: 'error', error: Error): void
}>()

const isCopied = ref(false)

const buttonClass = computed(() => {
  return cn(
      'flex  h-8 w-8 rounded transition-colors hover:outline outline-primary/40 ',
      // props.isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300/33',
      isCopied.value ? '' : '',
      props.class
  )
})

const copyToClipboard = async () => {
  if (props.isDisabled) return

  try {
    await navigator.clipboard.writeText(props.value)
    emit('copy', props.value)
    isCopied.value = true
    emit('copied')
    setTimeout(() => {
      isCopied.value = false
    }, props.duration)
  } catch (error) {
    console.error('Failed to copy: ', error)
    emit('error', error as Error)
  }
}

</script>