<template>
  <div>
    <NuxtLayout name="global-layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import { useI18n } from '#imports';

const {t,locale}=useI18n()

useHead({
  title:'API2O',
  titleTemplate: (title) => `${title} - ${t('titlePostfix')}`, //Do not use this if you are doing SEO
  htmlAttrs:{
    lang:locale.value
  },
})


</script>

<style>
</style>