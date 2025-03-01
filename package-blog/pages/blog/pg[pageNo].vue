<script setup lang="ts">
import {assertAny} from "~/lib/common-utils";
import BlogPage from "~/components/blog/BlogPage.vue";
import { useRoute } from "vue-router";


const {params} = useRoute()
assertAny(!Array.isArray(params.pageNo), "pageNo should not be array")
const pageNo = Number.parseInt(params.pageNo as string) ?? 1

</script>

<template>
  <BlogPage :page-no="pageNo"/>
</template>

<style scoped>

</style>