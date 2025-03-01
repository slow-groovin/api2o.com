<template>
  <div class="relative inline-block dark:border rounded">
    <div
        class="flex items-center text-sm font-medium rounded dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-white pl-1"
    >
      <BrainCircuitIcon class="w-4 h-4 " />
      <span class="px-1 py-1">AI-powered</span>
      <span
          class="px-2 py-1 rounded-r dark:bg-gray-800  dark:text-white bg-gray-300 text-neutral-600 "
      >translation</span>
    </div>
    <div
        class="absolute z-10 w-64 px-4 py-2 text-sm rounded shadow-lg transition-opacity duration-300 bg-background"
        :class="[
        showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
      ]"
        style="top: 100%; left: 50%; transform: translateX(-50%);"
    >
      This article has been translated by LLM model and revised by the author.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BrainCircuitIcon } from 'lucide-vue-next';

const showTooltip = ref(false);

const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
};

onMounted(() => {
  const badgeElement = document.querySelector('.relative');
  badgeElement.addEventListener('mouseenter', handleMouseEnter);
  badgeElement.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  const badgeElement = document.querySelector('.relative');
  badgeElement.removeEventListener('mouseenter', handleMouseEnter);
  badgeElement.removeEventListener('mouseleave', handleMouseLeave);
});
</script>