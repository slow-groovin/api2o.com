<script setup lang="ts">
import { useI18n,useSeoMeta } from '#imports';

const {t}=useI18n()
useSeoMeta({
  title:"API",
  description: t('apiDesc')
})
</script>

<template>

  <NuxtLayout name="handbook-layout">
    <NuxtPage/>
  </NuxtLayout>

</template>

<style scoped>

</style>