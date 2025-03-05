<template>
  <main class="container p-8">
    <h1 class="text-3xl font-extrabold mb-2">🛠️{{ t('tool') }}</h1>
    <section>
      <h2 class="text-2xl font-bold mt-4">Online {{ t('tool') }}</h2>
      <p class="font-light italic mb-4">{{ t('toolDesc') }}</p>

      <div class="flex flex-col gap-8">
        <div v-for="item in toolItems" class="border p-2 rounded-lg">
          <NuxtLink :to="localePath(`/tool/${item.id}`)"
            class="flex flex-col gap-2 underline text-primary font-bold text-2xl">
            {{ getI18nVal(item.id, 'title') }}
          </NuxtLink>
          <p class="font-light italic text-wrap">
            {{ getI18nVal(item.id, 'description') }}
          </p>
        </div>
      </div>
    </section>


    <section class="mt-16">
      <h2 class="text-2xl font-bold my-4">Browser extension {{ t('tool') }}</h2>

      <div class="flex flex-row gap-8">
        <div v-for="item in extItems" class="border p-2 rounded-lg w-fit">
          <a :href="item.url" class="flex flex-row items-center gap-2 underline text-primary font-bold text-2xl">
            <img :src="item.icon" alt="icon">
            {{ item.id }}
          </a>
          <p class="font-light italic text-wrap">
            {{ item.description }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath, useSeoMeta } from '#imports';



const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({
  title: t('tool'),
  description: t('toolDesc')
})
const toolItems = [
  {
    id: "object-id-parser",
  },
  {
    id: "elastic-painless-script-format",
  },
]

const extItems = [
  {
    id: "webpage summary",
    url: "https://github.com/slow-groovin/webpage-summary",
    icon: "https://raw.githubusercontent.com/slow-groovin/webpage-summary/main/packages/ext/assets/16.png",
    description: "Open Source browser extension for Webpage summary with AI"

  }
]
const getI18nVal = (id: string, subKey: string) => t(`tools.${id}.${subKey}`)

</script>
<style scoped></style>