<script setup lang="ts">
import { useLocalePath } from '#imports';
import type { BlogCollectionItem } from '@nuxt/content';
import { Icon } from "#components";

const props = defineProps<{
  doc: BlogCollectionItem,
  doc2?: {
    title?: string,
    tags?: string[],
    date?: string,
    description?: string,
    image?: {
      src: string,
      alt: string,
      width: number,
      height: number
    },
    head?: {
      meta: {
        name: string,
        content: string
      }[]
    }
  }
}>()
const localePath = useLocalePath()

const img = props.doc.meta.image as { src: string, alt: string }
</script>

<template>
  <div class="flex flex-col border-b mb-4">
    <div v-if="img" class="lg:h-64 max-lg:max-h-32 rounded-xl shadow-xl shadow-foreground/35 mb-3  ">
      <img :src="img.src" :alt="img.alt" class="object-cover object-top !h-full w-full rounded-lg">
    </div>

    <h1 class="text-wrap font-bold text-4xl   my-5">{{ doc?.title }}</h1>


    <p class="italic mb-3 font-extralight"> {{ doc?.description }} </p>

    <div class=" ">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row items-center text-bold text-blue-500">
          <Icon name="ri:time-line" />
          <span>
            {{ new Date(doc?.date).toLocaleDateString() }}
          </span>
          <span v-if="doc?.last_updated" class="text-xs ml-4 self-end">
            updated:
            {{ new Date(doc?.last_updated)?.toLocaleDateString() }}
          </span>
        </div>
        <div v-if="doc?.tags && doc?.tags.length > 0">
          <Icon name="mdi:tag-outline" />
          <NuxtLink class="underline mr-3 inline-block text-primary" v-for="(tag, index) in doc?.tags" :key="tag"
            target="blank" to="#">
            {{ tag }}<span v-if="index + 1 !== doc?.tags?.length">, </span>
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>