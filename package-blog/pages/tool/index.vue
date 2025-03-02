

<template>
  <div class="container p-8">
    <h1 class="text-3xl font-extrabold mb-2">🛠️{{t('tool')}}</h1>
    <div class="flex flex-col gap-y-4">
      <div v-for="item in toolItems">
        <NuxtLink :to="localePath(`/tool/${item.id}`)" class="flex flex-col gap-2 underline text-primary">
          {{getI18nVal(item.id, 'title')}}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath, useSeoMeta } from '#imports';


const {t}=useI18n()
const localePath = useLocalePath()
useSeoMeta({
  title:t('tool'),
  description:t('toolDesc')
})
const toolItems=[
  {
    id:"object-id-parser",
  },
  {
    id:"elastic-painless-script-format",
  },
]
const getI18nVal=(id:string,subKey:string)=>t(`tools.${id}.${subKey}`)

</script>
<style scoped>

</style>