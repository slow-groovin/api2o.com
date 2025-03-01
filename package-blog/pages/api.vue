<script setup lang="ts">
const {t}=useI18n()
useSeoMeta({
  title:"API",
  description: t('apiDesc')
})
</script>

<template>

  <NuxtLayout name="api-layout">
    <NuxtPage/>
  </NuxtLayout>

</template>

<style scoped>

</style>