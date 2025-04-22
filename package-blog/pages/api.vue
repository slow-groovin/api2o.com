<script setup lang="ts">
import { ref, useI18n, useSeoMeta, onUnmounted } from '#imports';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const { t } = useI18n()
useSeoMeta({
  title: "API",
  description: t('apiDesc')
})

/*
 * hint page loading status
 */
const isLoading = ref(false)
if (import.meta.client) {
  const router = useRouter()
  let removeBeforeEach: Function, removeAfterEach: Function, timer: number
  onMounted(() => {
    removeBeforeEach = router.beforeEach(async (to, from, next) => {
      timer = window.setTimeout(() => isLoading.value = true, 500)

      next()
    })

    removeAfterEach = router.afterEach((to, from, failure) => {
      if (timer) {
        window.clearTimeout(timer)
      }

      isLoading.value = false

    })
  })

  onUnmounted(() => {
    removeBeforeEach?.()
    removeAfterEach?.()
  })
}



</script>

<template>

  <NuxtLayout name="api-layout">
    <div v-show="!isLoading">
      <NuxtPage />
    </div>
    <div v-if="isLoading"
      class="rounded-full border-4 border-t-transparent border-primary animate-spin size-64 mx-auto mt-32">

    </div>
  </NuxtLayout>

</template>

<style scoped></style>