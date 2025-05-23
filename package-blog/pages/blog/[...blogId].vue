<script setup lang="ts">

import { computed, showError, useAsyncData, useHead, useI18n } from '#imports';
import { useLocalStorage } from '@vueuse/core';
import { Waline } from '@waline/client/component';
import '@waline/client/style';
import { useRoute } from 'vue-router';
import BlogBottomButtons from '~/components/blog/BlogBottomButtons.vue';
import BlogFooter from '~/components/blog/BlogFooter.vue';
import BlogHead from '~/components/blog/BlogHead.vue';
import MarkdownToc from '~/components/blog/MarkdownToc.vue';
import AITranslationBadge from '~/components/hint/badge/AITranslationBadge.vue';
import { queryBlog } from '~/composables/blog';

const walineServerURL = 'https://waline.api2o.com';
const path = computed(() => useRoute().path);

const isProd = !import.meta.dev

const start = Date.now()

const { t, locale } = useI18n()


let { params: { blogId } } = useRoute()

const { data, error } = await useAsyncData('blog', () => queryBlog(locale.value, blogId))
if (!data.value) showError({ statusCode: 404 })


const doc = computed(() => data.value?.markdownItem)
const next = computed(() => data.value?.next)
const previous = computed(() => data.value?.previous)


/**
 * if width is full screen
 */
const viewPortWide = useLocalStorage('blog-viewport-wide', false)

useHead({
  title: doc.value?.title,
  meta: [
    { name: 'description', content: doc.value?.description },
  ],
  link: [

  ],
  script: [
    // {
    //   type: 'module',
    //   textContent: `
    //         import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    //         init({
    //           el: '#comment-system',
    //           serverURL: 'https://waline.api2o.com',
    //         });
    //       `
    // }
  ]
})



</script>
<template>
  <div v-if="doc" :style="viewPortWide ? { width: '99vw', maxWidth: '100vw' } : {}"
    class="relative max-lg:max-w-full  max-w-[min(60vw,60rem)] mx-auto justify-center h-full  gap-3 ">


    <!--      悬浮标题栏-->
    <ClientOnly>
      <MarkdownToc
        class="fixed top-[10vh] right-12 max-lg:static max-lg:max-w-full max-w-52 opacity-80  shrink-[0.3] h-fit  break-all text-nowrap text-ellipsis"
        v-if="doc?.body?.toc" :toc="doc?.body?.toc" />
    </ClientOnly>

    <!--      主体-->
    <main class="flex flex-col max-xl:max-w-full flex-grow mt-3">
      <!--      标题head 和 内容主体-->
      <main class=" flex   flex-col px-4 py-4
          dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 rounded-lg">
        <!--      no translation hint-->
        <!-- <NoTranslationSoDefault v-if="true" :msg="t('no-trans-so-default')"/> -->

        <!--      ai translate badge-->
        <AITranslationBadge v-if="doc.meta._translate === 'ai'" class="w-fit mb-4" />

        <BlogHead :doc="doc" />

        <!--        render markdown-->
        <main class="prose">
          <ContentRenderer class="prose scroll-smooth " :value="doc" />
        </main>


        <BlogFooter :next-article="next" :previous-article="previous" />

      </main>
      <!--blog footer-->
    </main>


    <ClientOnly v-if="isProd">
      <section id="comment-system" class="border rounded-xl px-4 mt-8">
        <Waline :serverURL="walineServerURL" :path="path" :lang="locale" />
      </section>
    </ClientOnly>


    <BlogBottomButtons />
  </div>
</template>