<script setup lang="ts">
import GenericBadge from "~/components/hint/badge/GenericBadge.vue";
</script>

<template>
  <GenericBadge
      icon="openmoji:hourglass-not-done"
      left-color="bg-neutral-400 dark:bg-neutral-200"
      right-color="bg-yellow-200 dark:bg-yellow-600"
      left-text="under" right-text="development"
      tooltip="this is not ready yet"/>
</template>

<style scoped>

</style>