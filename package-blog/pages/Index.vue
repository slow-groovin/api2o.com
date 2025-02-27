<script setup lang="ts">
import {useAsyncData} from '#app'
import { queryCollection } from '#imports';

const { data: gh } = await useAsyncData(() => queryCollection('blog').path('/sample/hello').first())


</script>

<template>
  <ContentRenderer v-if="gh" :value="gh" />
  <div v-else>Home not found</div>
</template>
