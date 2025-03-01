<script setup lang="ts">
import {defineProps} from "vue";
import type {ParamDesc} from "~/utils/api/desc";
import ParamDescTable from "~/components/api/ParamDescTable.vue";

const props = defineProps<{
  items: ParamDesc[];
}>()
</script>

<template>
  <ParamDescTable :items="items"/>
</template>

<style scoped>

</style>