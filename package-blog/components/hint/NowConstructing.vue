<script setup lang="ts">
import { useI18n } from '#imports';

const {t}=useI18n()
</script>

<template>
  <div class=" flex items-center justify-center h-screen ">
    <div class="text-center bg-gray-100 p-6 rounded">
      <svg class="mx-auto w-24 h-24 text-yellow-500 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2a9.9 9.9 0 00-8 3.79M12 22c-2.14 0-4.15-.76-5.79-2.05M12 22a9.9 9.9 0 008-3.79M15.5 8A3.5 3.5 0 1112 4.5 3.5 3.5 0 0115.5 8zM8 9.5A3.5 3.5 0 115.5 6 3.5 3.5 0 018 9.5zm3 3.5A3.5 3.5 0 1112 7.5 3.5 3.5 0 0115.5 11h1v6a1 1 0 001 1h2a1 1 0 001-1v-6h-1.5a3.5 3.5 0 00-2.5-2.5zm-6 0A3.5 3.5 0 015.5 8H4v6a1 1 0 01-1 1H1a1 1 0 01-1-1v-6h1.5A3.5 3.5 0 015.5 11h1.5a3.5 3.5 0 002.5 2.5z"/>
      </svg>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">{{t('constructingTitle')}}</h1>
      <p class="text-lg text-gray-600 mb-4">{{t('constructingContent')}}</p>
      <a href="/"
         class="inline-block px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-colors duration-200">
        {{t('goHome')}}
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>