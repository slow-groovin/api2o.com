<template>
  <div class="flex flex-col">
    <!-- Top Navigation Bar with Frosted Glass Effect -->

    <div id="__top_anchor" />

    <header class="fixed max-lg:static top-0 left-0 right-0  z-50"
      :class="{ 'scroll-hide': scrollDirection === 'down' }">
      <div class="shadow-md py-1 px-4  backdrop-blur-lg backdrop-blur-custom border-b bg-white/30">
        <div class="lg:container flex flex-wrap items-stretch gap-x-4 max-lg:gap-x-1 ">
          <!-- Logo -->
          <NuxtLink to="/" class="border border-primary/50 rounded px-0.5 text-primary font-semibold flex items-center">
            <!-- <img class="max-lg:hidden h-8 mr-1 rounded object-contain " :src="logo" alt="api2o.com logo" /> -->
            <span class="">API2O</span>
          </NuxtLink>

          <!-- Navigation Links -->
          <NuxtLink :to="localePath('blog')" class="hover:bg-secondary rounded flex items-center px-1"
            :class="{ 'font-semibold': route.path.startsWith(localePath('blog')) }">📰{{ t('blog') }}
          </NuxtLink>
          <NuxtLink :to="localePath('handbook')" class=" hover:bg-secondary rounded flex items-center px-1"
            :class="{ 'font-semibold': route.path.startsWith(localePath('handbook')) }">📚{{ t('handbook')
            }}</NuxtLink>
          <NuxtLink :to="localePath('tool')" class=" hover:bg-secondary rounded flex items-center px-1"
            :class="{ 'font-semibold': route.path.startsWith(localePath('tool')) }">🛠️{{ t('tool') }}
          </NuxtLink>
          <NuxtLink :to="localePath('api')" class=" hover:bg-secondary rounded flex items-center px-1"
            :class="{ 'font-semibold': route.path.startsWith(localePath('api')) }">🌐{{ t('api') }}
          </NuxtLink>



          <!--          search-->
          <!-- <NuxtLink :to="localePath('search')" target="_blank"
              class="border-2 border-border rounded h-8 w-8 flex items-center justify-center hover:ring-1">
              <span class="sr-only">Search</span>
              <Icon name="material-symbols:search" />
            </NuxtLink> -->


          <!--          color switch dark/light-->
          <div class="flex-grow justify-end flex items-center">

            <ColorSwitchButton class="w-8 h-8 border" />
            <!--          language switch-->
            <LangSwitchButton />

            <!-- RSS -->
            <a :href="`/rss-${locale}.xml`" target="_blank" class="rounded-lg size-8 border p-1 hover:bg-accent/50"
              aria-label="RSS" title="RSS">
              <Icon name="mdi:rss" class="size-full" />

            </a>
            <!-- Github Link -->
            <a href="https://github.com/slow-groovin/api2o.com" target="_blank"
              class="rounded size-8 text-foreahead hover:bg-accent/50" aria-label="Github" title="Github">
              <Icon name="mdi:github" class="size-full" />
            </a>


          </div>

        </div>
      </div>
    </header>


    <!-- Main Content (Replace this with your blog content) -->

    <div class="mt-12 flex flex-col flex-1">
      <slot />
    </div>
    <!-- Footer -->
    <footer class=" text-gray-300 py-4">
      <div class="container px-4 flex justify-between items-center">
        <!-- Footer Info -->

        <p>
          <img class="inline h-4 mr-1 rounded opacity-70" src="/icon/logo-bottom.png" alt="api2o.com logo" />

          &copy; api2o.com:: a website of blog, tools, APIs. All rights reserved.
        </p>

        <!-- Footer Links -->
        <nav class="space-x-4">
          <a href="https://github.com/slow-groovin/api2o.com" target="_blank"
            class="hover:underline">https://github.com/slow-groovin/api2o.com</a>

          <a :href="`/rss-${locale}.xml`" target="_blank" class="rounded-lg  border p-1 hover:bg-accent/50"
            aria-label="RSS" title="RSS">
            RSS
            <Icon name="mdi:rss" class="h-4 w-4" />

          </a>
        </nav>
      </div>
    </footer>

    <GotoTop class="w-8 h-8 bottom-8 right-8" />


    <ClientOnly>
      <PageVisitCounter :key="route.path" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { Icon } from "#components";
import { onMounted, ref, useI18n, useLocalePath } from "#imports";
import { RssIcon } from "lucide-vue-next";
import { useRoute } from "vue-router";
import PageVisitCounter from "~/components/blog/PageVisitCounter.vue";
import ColorSwitchButton from "~/components/nav/ColorSwitchButton.vue";
import GotoTop from "~/components/nav/GotoTop.vue";
import LangSwitchButton from "~/components/nav/LangSwitchButton.vue";

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { public: { logo } } = useRuntimeConfig()



const scrollDirection = ref<'up' | 'down'>('up')
let lastScroll = 0
let SCROLL_THRESHOLD = 250


onMounted(() => {
  window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (Math.abs(scrollTop - lastScroll) < SCROLL_THRESHOLD) return
    scrollDirection.value = scrollTop - lastScroll > 0 ? "down" : 'up'
    lastScroll = scrollTop
  });

})
</script>

<style scoped>
header {
  transition: transform 0.35s ease-in-out;
}

header.scroll-hide {
  transform: translateY(-100%);
}
</style>