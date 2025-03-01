<script setup lang="ts">
import {list} from "radash";
import type {HTMLAttributes} from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  count: number,
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ClientOnly>
    <div :class="cn(' px-3 w-fit min-h-8  shadow fixed bottom-0 right-0   transform rounded-l-2xl rounded-r-2xl',
      'flex flex-row flex-nowrap items-center',
      'border bg-white/75',
      'dark:border-0  dark:bg-gray-600',
      'bottom-buttons-container', props.class)">
      <div class="bottom-item w-fit h-fit flex items-center " v-for="i in list(1,count)">
        <slot :name="'slot'+i"/>
      </div>
    </div>
  </ClientOnly>

</template>

<style>
.bottom-buttons-container > .bottom-item {
  margin-left: 4px;
  padding-right: 4px;
  position: relative;

}

.bottom-buttons-container > .bottom-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 15%; /* 控制分割线距离顶部的距离 */
  height: 70%; /* 控制分割线的高度（占元素高度的50%） */
  width: 1px;
  background-color: rgba(123, 121, 121, 0.49); /* 分割线颜色 */
}

</style>