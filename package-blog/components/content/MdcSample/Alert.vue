<script setup>
defineProps(['type'])
</script>

<template>
  <div class="border" :class="type">
    {{type}}
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
