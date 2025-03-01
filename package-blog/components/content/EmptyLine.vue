<script setup lang="ts">
import {list} from "radash";


withDefaults(defineProps<{lines:number}>(),{
  lines:1
})
</script>

<template>
  <div>
    <br v-for="_ in list(lines)" :class="_"/><slot/>
  </div>
</template>

<style scoped>

</style>