<script setup lang="ts">

import BottomButtonsContainer from "~/components/nav/BottomButtonsContainer.vue";
import {useLocalStorage} from "@vueuse/core";
import { Icon } from "#components";
const showToc=useLocalStorage('blog-show-toc',true)
const viewPortWide=useLocalStorage('blog-viewport-wide',false)
</script>

<template>
<BottomButtonsContainer :count="2" class=" text-gray-700 dark:text-gray-300">
  <template #slot1>
    <button class="item hover:bg-neutral-300 rounded" :class="{'text-primary bg-primary/30':viewPortWide}"  @click="viewPortWide=!viewPortWide">
      <Icon name="pixelarticons:viewport-wide" class="w-6 h-6" mode="svg"/>
    </button>
  </template>
  <template #slot2>
    <button class="item hover:bg-neutral-300 rounded" :class="{'text-primary bg-primary/30':showToc}"  @click="showToc=!showToc">
      <Icon name="ic:outline-toc" class="w-6 h-6" mode="svg"/>
    </button>
  </template>


</BottomButtonsContainer>
</template>

<style scoped>

</style>