<template>
  <a
    :href="githubSourceUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
  >
    <GithubIconSvg class="inline-block h-5 w-5 mr-1" />
    <span>View Source</span>
  </a>
</template>

<script setup lang="ts">
import GithubIconSvg from '~/components/svg/GithubIconSvg.vue'
import { computed } from 'vue'
const props = defineProps({
  relativepath: {
    type: String,
    required: true,
  },
})

const githubSourceUrl = computed(() => {
  return `https://github.com/slow-groovin/api2o.com/blob/main/package-blog/${props.relativepath}`
})
</script>

<style scoped></style>
