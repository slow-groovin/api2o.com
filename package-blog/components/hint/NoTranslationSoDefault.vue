<script setup lang="ts">
defineProps<{msg:string}>()
</script>

<template>
  <div class="flex items-center bg-blue-50 border-l-4 border-blue-400 p-2 my-4 text-wrap">
    <svg class="max-w-8 max-h-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
         fill="currentColor"
         aria-hidden="true">
      <path fill-rule="evenodd"
            d="M9 2a7 7 0 00-7 7 7 7 0 0014 0 7 9 0 00-7-7zm0 2a5 5 0 100 10A5 5 0 009 4zm.293 7.707a1 1 0 011.414-1.414l2 2a1 1 0 01-1.414 1.414l-2-2zm-3 0a1 1 0 011.414 1.414l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 011.414-1.414z"
            clip-rule="evenodd"/>
    </svg>
    <div class="ml-3 text-sm ">
      <pre>{{ msg }}</pre>
    </div>
  </div>
</template>

<style scoped>

</style>