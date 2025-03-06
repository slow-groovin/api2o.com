<template>
  <div class="mt-5   ">
    <Separator class="w-full h-1   bg-foreground"/>
    <div class="flex justify-between items-center w-full py-4 px-6 bg-muted   border-b border-x ">
      <NuxtLink
          v-if="previousArticle"
          :to="previousArticle.link"
          class="flex items-center  text-blue-600 hover:text-blue-800 transition-colors duration-200 w-[45%]"
      >
        <ChevronLeftIcon class="w-5 h-5 "/>
        <div class="text-nowrap">{{ t('previous') }}:</div>
        <div class=" max-w-[67%] overflow-hidden overflow-ellipsis text-nowrap inline-block  "
             :title="previousArticle.title">{{ previousArticle.title }}
        </div>
      </NuxtLink>
      <span v-else class="text-gray-400">{{ t('noPrevious') }}</span>

      <NuxtLink
          v-if="nextArticle"
          :to="{ path: nextArticle.link}"
          class="flex justify-end  items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 w-[45%]"
      >
        <div class="text-nowrap">{{ t('next') }}:</div>
        <div class=" max-w-[67%] overflow-hidden overflow-ellipsis text-nowrap inline-block  "
             :title="nextArticle.title">{{ nextArticle.title }}
        </div>

        <ChevronRightIcon class="w-5 h-5"/>
      </NuxtLink>
      <span v-else class="text-gray-400">{{ t("noNext") }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports';
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-vue-next'
import { Separator } from 'reka-ui';


interface Article {
  title: string
  link: string
  // 其他文章属性...
}

interface Props {
  previousArticle?: Article
  nextArticle?: Article
}

defineProps<Props>()

const {t} = useI18n()
</script>