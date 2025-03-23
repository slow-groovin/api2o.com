<template>
  <div>
    <!-- page visit counter -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, useRuntimeConfig } from '#imports';
import { useRoute } from 'vue-router';
const { public: { apiBaseUrl, apiBearerToken } } = useRuntimeConfig()
const { path } = useRoute()
onMounted(async () => {
  fetch(apiBaseUrl + '/api/v1/visit/counter/page?path=' + path, {
    headers: {
      Authorization: `Bearer ${apiBearerToken}`,
    },
    method: 'POST',
  })

})

</script>