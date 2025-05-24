<template>
  <NuxtLink v-if="!props.href.startsWith('http')" :href="props.href" :target="props.target">
    <slot />
  </NuxtLink>
  <a v-else :href="props.href" target="_blank" class="inline align-top  ">
    <span>
      <slot />
    </span>
    <span class="inline">
      <ExternalLinkIcon class="inline size-4" />
    </span>
  </a>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ExternalLinkIcon } from 'lucide-vue-next'
const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false
  }
})
</script>
<style>
/* a{
  display: flex;
} */
</style>