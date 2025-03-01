<template>
  <aside class="flex flex-row h-[85vh] w-fit border-r "
         :class="{ 'border-r-0': collapsed,'min-w-44':!collapsed }"
  >
    <nav class=" flex-1 px-1 overflow-y-auto mt-4"  v-show="!collapsed">
      <div class="text-[#949494] mb-3">API LIST</div>
        <ul class="flex flex-col ml-2">
          <li v-for="category in categories" :key="category.id">
            <div
                @click="toggleCategory(category.id)"
                class="flex items-center justify-between rounded-md cursor-pointer "
            >
              <span class="font-semibold " >{{ category.name }}</span>
              <span
                  
                  class="font-extralight text-xs"
                  :class="{ 'rotate-180': category.expanded }"
              >▼</span>
            </div>
            <div class="font-normal ml-2 mr-2 mb-4">
              <ul v-show="category.expanded" class="flex flex-col gap-y-0.5">
                <li v-for="link in category.links" :key="link.id" class="flex items-center">
                  <HttpMethodBadge v-if="link.type==='rest'" :method="link.method as HttpMethodStr" class="p-0.5 mr-0.5 h-4 w-fit text-[10px] block"/>
                  <GraphqlSvg v-if="link.type==='graphql'" class="p-0.5 mr-0.5 w-4 h-4 rounded bg-pink-600 text-white text-[10px] block"/>
                  <NuxtLink
                      :to="localePath('/api'+link.url)"
                      class="inline-block  rounded-md transition-all duration-200 "
                  >
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
    </nav>
<!--    collapse button-->
    <div class="self-center "  :class="{ 'border-r': collapsed }">
      <button
          @click="toggleCollapse"
          class="py-4 border rounded "
      >
        {{ collapsed ? '>' : '<' }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HttpMethodBadge from "~/components/api/HttpMethodBadge.vue";
import type { HttpMethodStr} from "~/lib/models/api-request";
import GraphqlSvg from "~/components/svg/GraphqlSvg.vue";
import { useLocalePath } from '#imports';
import { apiRouters } from '~/lib/configs/api/router';
const localePath=useLocalePath()


const collapsed = ref(false)

const categories = ref(apiRouters)

const toggleCategory = (categoryId: number) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    category.expanded = !category.expanded
  }
}

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
  // if (collapsed.value) {
  //   categories.value.forEach(category => category.expanded = false)
  // }
}
</script>