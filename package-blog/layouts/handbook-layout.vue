<template>
  <div class="flex flex-row max-lg:flex-col container">
    <HandbookSidebar class="w-fit m-2"/>
    <div class="flex-1 min-h-[calc(100vh-4em-4em)] max-lg:max-w-full">
      <slot/>
      
<!--      footer text description. for seo-->
      <div class="text-gray-700/50 mx-auto border rounded w-fit">
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HandbookSidebar from '~/components/handbook/HandbookSidebar.vue';

</script>