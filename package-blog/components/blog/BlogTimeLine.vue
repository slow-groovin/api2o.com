<script setup lang="ts">
import { Icon } from "#components";
import { genBlogPath } from "~/lib/blog-util";
import { useI18n } from "#imports";
const { locale } = useI18n()
const MAX_TAG_LEN = 3
defineProps<{
  docs: {
    _id: string,
    date: Date,
    tags: string[],
    title: string
  }[]
}>()



</script>

<template>
  <div class="grid grid-cols-[auto,1fr] text-nowrap gap-x-2 gap-y-4">
    <template v-for="doc in docs" class="flex gap-4 p-2 border-b-2 max-w-full">
      <!--      date prefix-->
      <div class="font-bold opacity-30 ">
        {{ new Date(doc.date).toISOString().split('T')[0] }}
      </div>
      <!-- title & tag line -->
      <div class=" flex flex-row  min-w-0 gap-3 flex-wrap ">
        <div class="text-ellipsis overflow-hidden max-w-full">
          <NuxtLink :to="genBlogPath(locale, doc._id)" target="_blank"
            class="text-primary opacity break-all  text-nowrap hover:opacity-70 transition-opacity duration-300">
            {{ doc.title }}
          </NuxtLink>
        </div>


        <div class="flex flex-row items-center overflow-hidden max-md:hidden" v-if="doc?.tags && doc?.tags.length > 0">
          <Icon name="mdi:tag-outline" />
          <div v-for="(tag, index) in doc.tags.slice(0, MAX_TAG_LEN)" class="flex flex-row">
            <div class="border-2 border-border opacity-55 text-xs bg-neutral-100 dark:bg-neutral-600 p-1 rounded-lg">
              {{ tag }}
            </div>
            <div v-if="index !== Math.min(MAX_TAG_LEN, doc.tags.length) - 1">,</div>
          </div>
        </div>
      </div>
    </template>
  </div>

</template>

<style scoped>
.aff {
  flex: 1 1 50%;
}
</style>