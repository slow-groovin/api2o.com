<template>
  <div>
    <NuxtLoadingIndicator :height="6" :duration="4000" />
    <NuxtLayout name="global-layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import { useI18n } from '#imports';
import { useHreflangMetaTags } from './composables/locale';

const { t, locale } = useI18n()
const tags = useHreflangMetaTags()
useHead({
  title: 'API2O',
  titleTemplate: (title) => `${title} - ${t('titlePostfix')}`, //Do not use this if you are doing SEO
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    ...tags
  ]
})


</script>

<style></style>