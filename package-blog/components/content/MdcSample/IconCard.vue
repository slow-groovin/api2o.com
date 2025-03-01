<script setup lang="ts">
defineProps<{color: string,title:string,content:string}>()
</script>

<template>
<div class="flex flex-row items-center rounded my-8">
  <div :class="color" class="text-white p-1">
    {{title}}
  </div>
  :
  <div>
    {{content}}
  </div>
</div>
</template>

<style scoped>

</style>