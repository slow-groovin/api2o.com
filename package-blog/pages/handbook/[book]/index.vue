<script setup lang="ts">
import { useAsyncData } from '#app';
import { useI18n, useSeoMeta } from '#imports';
import { useHandbookOutline } from '~/composables/handbook';
import { useRoute } from 'vue-router';
const { locale, t } = useI18n()
const { data } = useAsyncData('handbook-outline', () => useHandbookOutline(locale.value))
useSeoMeta({
  title: () => (data?.value?.book ?? 'book') + ' ' + t('handbook'),
  description: () => `${data?.value?.book} ${t('handbook')} : ${t('handbookDesc')}`

})
</script>

<template>
  <div class="ml-32">
    <h1 class="text-3xl font-semibold mb-8"> {{ data?.book }}</h1>

    <!-- chapters -->
    <div class="space-y-4  w-fit " v-if="data">
      <!-- group -->
      <div v-for="group in data.chapterGroups" :key="group.name" class="mb-8">
        <div class="font-bold ">{{ group.name }}</div>
        <div class="flex flex-col gap-4">
          <NuxtLink v-for="chapter in group.chapters" :key="chapter.name" :to="chapter.path" :title="chapter.name"
            class="text-green-500 hover:text-green-700 underline">
            {{ chapter.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped></style>
