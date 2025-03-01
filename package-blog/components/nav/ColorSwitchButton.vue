<script setup lang="ts">
import {useDark, useToggle} from "@vueuse/core";

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <Button
        class="flex items-center justify-center p-1.5"
        aria-label="Toggle dark mode"
        :variant="'ghost'"
        :size="'icon'"
        as="button"
        @click="toggleDark()"
    >
      <Icon
          class="text-foreground h-full w-full"
          :name="isDark ? 'radix-icons:moon' : 'radix-icons:sun'"
      />
    </Button>
</template>

<style scoped>

</style>