<template>
  <main class="container p-8">
    <h1 class="text-3xl font-extrabold mb-2">🛠️{{ t('tool') }}</h1>
    <section>
      <h2 class="text-2xl font-bold mt-4">Online {{ t('tool') }}</h2>
      <p class="font-light italic mb-4">{{ t('toolDesc') }}</p>

      <div class="flex flex-row flex-wrap gap-4 max-md:flex-col">
        <div v-for="item in toolItems" class="inline-block border p-4 rounded-lg w-min min-w-72 max-md:w-full">
          <NuxtLink :to="localePath(`/tool/${item.id}`)"
            class="flex flex-col gap-2 underline text-blue-500 font-bold text-lg text-nowrap">
            {{ getI18nVal(item.id, 'title') }}
          </NuxtLink>
          <p class="font-light italic text-wrap break-words">
            {{ getI18nVal(item.id, 'description') }}
          </p>
        </div>
      </div>
    </section>


    <section class="mt-16">
      <h2 class="flex items-center gap-2 text-2xl font-bold my-4">
        <GithubInlineIcon />
        OSS {{ t('tool') }}
      </h2>

      <div class="flex flex-row flex-wrap gap-8 max-md:flex-col">
        <div v-for="item in ossItems" class="border p-4 rounded-lg w-min min-w-72 max-md:w-full">
          <!-- title -->
          <div class="flex items-center gap-1">
            <img v-if="item.icon" :src="item.icon" alt="icon" class="block size-6 min-w-6">

            <a :href="item.url" target="_blank"
              class="flex flex-row text-nowrap mr-8  items-center gap-2 text-primary font-bold ">
              {{ item.id }}
            </a>
            <div class="flex-1"></div>

            <template v-for="icon in item.rightIcons">
              <img :src="icon" alt="icon" class="block size-6 min-w-6 ">
            </template>

          </div>
          <!-- link -->
          <div class=" flex items-center gap-8 text-sm my-1 text-nowrap">
            <a :href="item.url" target="_blank" class="flex items-center gap-1 text-[rgb(161,97,7)]">
              <GithubInlineIcon class="block size-4" />
              <span class="hover:underline">Visit Github</span>
            </a>

            <a v-if="item.article" :href="item.article" target="_blank" class="flex items-center text-[rgb(161,97,7)]">
              📝<span class="hover:underline">description</span>
            </a>


          </div>
          <!-- desc -->
          <p class="font-light italic text-wrap whitespace-pre-wrap">
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
    id: "ai-sse-result-parse",
  },
  {
    id: "object-id-parser",
  },
  {
    id: "elastic-painless-script-format",
  },

]

const ossItems = [
  {
    id: "webpage summary",
    url: "https://github.com/slow-groovin/webpage-summary",
    icon: "https://raw.githubusercontent.com/slow-groovin/webpage-summary/main/packages/ext/assets/16.png",
    rightIcons: [
      "https://img.icons8.com/?size=48&id=ejub91zEY6Sl&format=png",
      "https://img.icons8.com/?size=100&id=-5h34CbaUb09&format=png&color=000000",
      "https://img.icons8.com/color/32/firefox.png",
    ],
    description: "browser extension for summarizing webpages with AI",
    article: localePath('/blog/intro-webpage-summary'),
  },


  {
    id: "jsr2npm",
    url: "https://github.com/slow-groovin/jsr2npm",
    rightIcons: [
      "https://img.icons8.com/?size=100&id=79750&format=png&color=676767",
    ],
    description: "mirror and clone packages from jsr.io to npm registry",
    article: localePath('/blog/intro-jsr2npm'),
  },

  {
    id: "unstorage-mcp",
    url: "https://github.com/slow-groovin/unstorage-mcp",
    rightIcons: [
      "https://nodejs.org/static/images/favicons/favicon.png",
    ],
    description: "MCP Server for simultaneously operate multiple key-value storage databases (Redis, MongoDB, memory, file system, etc.).",
    article: localePath('/blog/intro-unstorage-mcp'),
  },

  {
    id: "web2api-ai-provider",
    url: "https://github.com/slow-groovin/web2api-ai-provider",
    rightIcons: [
      "https://img.icons8.com/?size=48&id=ejub91zEY6Sl&format=png",
      "https://img.icons8.com/?size=100&id=-5h34CbaUb09&format=png&color=000000",
    ],
    description: `includes: 
1.serveral providers to convert website chat to @ai-sdk usage.
2. a suite to convert providers to openai-compatible http api.`,
  }
]
const getI18nVal = (id: string, subKey: string) => t(`tools.${id}.${subKey}`)

</script>
<style scoped></style>