<template>
  <div class="relative inline-block dark:border  rounded" ref="badge">
    <div
      class="flex items-center text-sm font-medium rounded dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-white pl-1"
      :class="leftColor">
      <Icon :name="icon" class="w-6 h-6 " />
      <span class="px-1 py-1">{{ leftText }}</span>
      <span class="px-2 py-1 rounded-r dark:bg-gray-800  dark:text-white bg-gray-300 text-neutral-600 "
        :class="rightColor">{{ rightText }}</span>
    </div>
    <div
      class="absolute z-10 w-64 px-4 py-2 text-sm rounded border-border border-2 shadow-lg transition-opacity duration-300 bg-background"
      :class="[
        showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none',

      ]" style="top: 100%; left: 0%; ">
      {{ tooltip }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import { Icon } from "#components";
const {
  tooltip = 'tooltip',
  leftText = 'left',
  rightText = 'right',
  leftColor = 'bg-blue-500',
  rightColor = 'bg-green-500',
  icon = 'mdi:circle'
} = defineProps<{
  tooltip: string,
  leftText: string,
  rightText: string,
  leftColor?: string,
  rightColor?: string,
  icon?: string
}>()

// console.log(tooltip,leftText,rightText,leftColor,rightColor,icon)

const showTooltip = ref(false);
// 第一个参数必须与模板中的 ref 值匹配

const badgeElement = useTemplateRef<HTMLElement>('badge')


//
const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
};
//
onMounted(() => {
  badgeElement.value?.addEventListener('mouseenter', handleMouseEnter);
  badgeElement.value?.addEventListener('mouseleave', handleMouseLeave);
});
//
onUnmounted(() => {
  badgeElement.value?.removeEventListener('mouseenter', handleMouseEnter);
  badgeElement.value?.removeEventListener('mouseleave', handleMouseLeave);
});
</script>