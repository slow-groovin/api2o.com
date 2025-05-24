<template>
  <figure class="max-w-full lg:p-6 mx-auto mb-12 text-center">
    <component :is="ImageComponent" :src="refinedSrc" :alt="props.alt" :width="props.width" :height="props.height"
      class="h-auto mx-auto rounded-md shadow-lg" />
    <figcaption class="mt-2 text-sm text-[#adb0b7] leading-relaxed">{{ alt }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
/**
 * custom ProseImg,  initally copy from: https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseImg.vue
 */
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>