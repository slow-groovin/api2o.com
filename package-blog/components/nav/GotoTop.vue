<template>
  <div class="fixed bottom-1 right-1 bg-background/50 shadow-lg rounded-full p-2 space-y-2 text-primary/50  aspect-square
    hover:bg-background   hover:text-primary active:border-foreground/50 active:border ring-1 hover:ring-2  "
       @click="scrollToTop"
  >

    <Icon name="cil:caret-top" size="1em" mode="svg"/>

  </div>
</template>

<script lang="ts" setup>
import { Icon } from "#components";

const props = defineProps<{ topAnchorId?: string }>()

function scrollTo(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({behavior: 'smooth'})
  }
}

function scrollToTop() {
  scrollTo(props.topAnchorId ?? '__top_anchor')
}


</script>

<style scoped>
/* 可以根据需要添加自定义样式 */
</style>
