<script setup lang="ts">
import { useI18n, } from '#imports';
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HandbookPage from '~/components/handbook/HandbookPage.vue';
const walineServerURL = 'https://waline.api2o.com';
const path = computed(() => useRoute().path);
const { locale } = useI18n()
</script>

<template>
  <div>
    <HandbookPage></HandbookPage>
  </div>

  <ClientOnly>
    <section id="comment-system" class="border rounded-xl px-4 mt-8">
      <Waline :serverURL="walineServerURL" :path="path" :lang="locale" />
    </section>
  </ClientOnly>
</template>

<style scoped></style>
