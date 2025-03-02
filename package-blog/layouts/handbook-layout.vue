<template>
  <div class="flex flex-row">
    <HandbookSidebar class="w-fit"/>
    <div class="flex-1 min-h-[calc(100vh-4em-4em)]">
      <slot/>
      
<!--      footer text description. for seo-->
      <div class="text-gray-700/50 mx-auto border rounded w-fit">
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import HandbookSidebar from '~/components/handbook/HandbookSidebar.vue';

const {path,fullPath}=useRoute()
const apiPath=path.replace(/\w+\/api\//,'')
</script>