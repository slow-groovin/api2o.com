<template>
  <div>
    <NuxtLayout name="global-layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useHeadSafe } from '@unhead/vue';
import { useI18n } from 'vue-i18n';

const {locale}=useI18n()

useHeadSafe({
  title:'api2o.com',
  titleTemplate: (title) => `${title} | api2o`,
  htmlAttrs:{
    lang:locale.value
  },
})


</script>

<style>
</style>