<template>
  <div class="flex flex-row">
    <ApiSidebar/>
    <div class="flex-1 min-h-[calc(100vh-4em-4em)]">
      <slot/>
<!--      footer text description. for seo&ndash;&gt;-->
      <div class="text-gray-700/50 mx-auto border rounded w-fit">
        {{apiPath}}: public API used for test/development/function provided by  API2O.com
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ApiSidebar from '~/components/api/ApiSidebar.vue';

const {path,fullPath}=useRoute()
const apiPath=path.replace(/\w+\/api\//,'')
</script>