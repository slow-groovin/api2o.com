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

const {locale}=useI18n()

useHead({
  title:'api2o.com',
  titleTemplate: (title) => `${title} | api2o`,
  htmlAttrs:{
    lang:locale.value
  },
})


</script>

<style>
</style>