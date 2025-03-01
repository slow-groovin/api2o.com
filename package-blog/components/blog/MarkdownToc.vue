<template>
  <div v-show="showToc" class="bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 " >
    <div class="p-5 relative">
      <h2 class="sticky mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
        {{ t('toc') }}
          <Switch v-model="showToc"></Switch>
      </h2>
      <hr/>


      <div class="mb-3 font-normal max-h-[calc(100vh-12em)] max-xl:max-h-full overflow-y-auto" >
        <ul class="pl-0">
          <li
              v-for="(subtitle,index) in toc.links"
              :key="subtitle.text"
              class="py-1  "
              :class="{ 'ml-6': subtitle.depth === 3 }"
          >
            <NuxtLink
                class="font-normal  hover:text-foreground text-ellipsis  overflow-x-hidden block"
                :class="{
                  'selected': hash==='#'+subtitle.id,
                  'text-muted-foreground': hash!=='#'+subtitle.id,
                 }"
                :to="'#' + subtitle.id"
            >
              {{ (1 + index) + '. ' + subtitle.text }}
            </NuxtLink>
            <ul v-if="subtitle.children && showTocChildren" class="my-2 pl-2" >
              <li
                  v-for="({ id: childId, text: childText },subIndex) in subtitle.children"
                  :key="childId"
                  class="mb-2 text-xs  last:mb-0  hover:text-foreground"

              >
                <NuxtLink :to="`#${childId}`" class="text-ellipsis  overflow-x-hidden block"
                          :class="{
                  'selected': hash==='#'+childId,
                  'text-muted-foreground': hash!=='#'+childId,
                 }"
                >
                   {{ (1 + subIndex) + ". " + childText }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {Toc} from "@nuxt/content";
import {useRouteHash} from "@vueuse/router";
import {useLocalStorage} from "@vueuse/core"
import { ref, useI18n } from "#imports";
import { Switch } from "#components";
const props = defineProps<{ toc: Toc }>()


const showTocChildren = ref(true)
const {t} = useI18n()
const hash = useRouteHash()
const showToc=useLocalStorage('blog-show-toc',true)

</script>
