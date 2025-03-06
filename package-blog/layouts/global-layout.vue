<template>
  <div class="flex flex-col">
    <!-- Top Navigation Bar with Frosted Glass Effect -->

    <div id="__top_anchor" />

    <header class="sticky top-0 left-0 right-0   z-50">
      <div class="shadow-md py-1 px-4  backdrop-blur-lg backdrop-blur-custom border-b bg-white/30"
        :class="{ 'hidden': !showHeader }">
        <div class="container flex items-center gap-x-4 ">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink :to="localePath('/index')">
              <img class="h-8 mr-1 rounded" :src="logo" alt="api2o.com logo" />
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <nav class="space-x-6 flex flex-nowrap text-nowrap">
            <NuxtLink :to="localePath('blog')" class=" hover:text-gray-900">📰{{ t('blog') }}</NuxtLink>
            <NuxtLink :to="localePath('handbook')" class=" hover:text-gray-900">📚{{ t('handbook') }}</NuxtLink>
            <NuxtLink :to="localePath('tool')" class=" hover:text-gray-900">🛠️{{ t('tool') }}</NuxtLink>
            <NuxtLink :to="localePath('api')" class=" hover:text-gray-900">🌐{{ t('api') }}</NuxtLink>
          </nav>

          <div class="flex-grow" />
          <!--        nav-button-group-->
          <div class="flex flex-row gap-x-2 items-center">
            <!--          search-->
            <!-- <NuxtLink :to="localePath('search')" target="_blank"
              class="border-2 border-border rounded h-8 w-8 flex items-center justify-center hover:ring-1">
              <span class="sr-only">Search</span>
              <Icon name="material-symbols:search" />
            </NuxtLink> -->

            <!--          language switch-->
            <!--          color switch dark/light-->
            <ColorSwitchButton class="w-8 h-8 border" />
            <LangSwitchButton />
            <!-- Github Link -->
            <a href="https://github.com/slow-groovin/api2o.com" target="_blank" class="rounded size-8 text-foreahead hover:bg-accent/50"
              aria-label="Github" title="Github">
              <Icon name="mdi:github" class="size-full"/>
            </a>
          </div>
        </div>
      </div>

      <!--    switch close header button-->
      <ClientOnly>
        <div class="absolute  right-0 p-0 flex flex-row justify-end"
          :class="{ 'rotate-0 bottom-[-1rem] text-primary/50': !showHeader, 'rotate-180 bottom-0 text-illustration-light ': showHeader }">
          <button class="border active:text-primary " @click="showHeader = !showHeader">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="8 8 8 8">
              <path fill="currentColor"
                d="m8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71" />
            </svg>
          </button>
        </div>
      </ClientOnly>

    </header>


    <!-- Main Content (Replace this with your blog content) -->

    <div class=" flex flex-col flex-1">
      <slot />
    </div>
    <!-- Footer -->
    <footer class=" text-gray-300 py-4">
      <div class="container px-4 flex justify-between items-center">
        <!-- Footer Info -->

        <p >
            <img class="inline h-4 mr-1 rounded opacity-70" src="/icon/logo-bottom.png" alt="api2o.com logo" />
          
          &copy; api2o.com:: a website of blog, tools, APIs. All rights reserved.</p>

        <!-- Footer Links -->
        <nav class="space-x-4">
          <a href="https://github.com/slow-groovin/api2o.com" target="_blank" class="hover:underline">https://github.com/slow-groovin/api2o.com</a>
        </nav>
      </div>
    </footer>

    <GotoTop class="w-8 h-8 bottom-8 right-8" />


  </div>
</template>
<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { ref, useI18n, useLocalePath } from "#imports";
import ColorSwitchButton from "~/components/nav/ColorSwitchButton.vue";
import GotoTop from "~/components/nav/GotoTop.vue";
import LangSwitchButton from "~/components/nav/LangSwitchButton.vue";
import { Icon } from "#components";
import { Button } from "~/components/ui/button";

const { t } = useI18n()
const localePath = useLocalePath()
const { public: { logo } } = useRuntimeConfig()
const showHeader = ref(true)
</script>