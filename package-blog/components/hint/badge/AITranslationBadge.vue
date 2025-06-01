<template>
  <div class="relative inline-block dark:border rounded" ref="badge">
    <div
      class="flex items-center text-sm font-medium rounded dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-white pl-1">
      <BrainCircuitIcon class="w-4 h-4 " />
      <span class="px-1 py-1">AI-powered</span>
      <span
        class="px-2 py-1 rounded-r dark:bg-gray-800  dark:text-white bg-gray-300 text-neutral-600 ">translation</span>
    </div>
    <div class="absolute z-10 w-64 px-4 py-2 text-sm rounded shadow-lg transition-opacity duration-300 bg-background"
      :class="[
        showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
      ]" style="top: 100%; left: 50%; transform: translateX(-50%);">
      This article has been translated by LLM model and revised by the author.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { BrainCircuitIcon } from 'lucide-vue-next';

const showTooltip = ref(false);
const badgeElement = useTemplateRef<HtmlElement>('badge')

const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
};

onMounted(() => {
  badgeElement.value?.addEventListener('mouseenter', handleMouseEnter);
  badgeElement.value?.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  badgeElement.value?.removeEventListener('mouseenter', handleMouseEnter);
  badgeElement.value?.removeEventListener('mouseleave', handleMouseLeave);
});
</script>