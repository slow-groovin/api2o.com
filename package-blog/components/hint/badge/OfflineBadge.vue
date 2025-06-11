<script setup lang="ts">
import GenericBadge from "~/components/hint/badge/GenericBadge.vue";
</script>

<template>
  <GenericBadge icon="carbon:cloud-offline" left-color="bg-green-600 dark:bg-green-200" right-color=""
    left-text="offline" right-text="tool"
    tooltip="The tool is js code that run entirely in browser (offline). No requests to backend." />
</template>

<style scoped></style>