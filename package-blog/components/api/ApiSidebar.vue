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
import type {GraphqlOpTypeStr, HttpMethodStr} from "~/utils/api/desc";
import GraphqlMethodBadge from "~/components/api/GraphqlMethodBadge.vue";
import GraphqlSvg from "~/components/svg/GraphqlSvg.vue";
const localePath=useLocalePath()

interface Link {
  id: number
  name: string
  url: string
  method: HttpMethodStr|GraphqlOpTypeStr
  type: 'rest'|'graphql'
}

interface Category {
  id: number
  name: string
  expanded: boolean
  links: Link[]
}

const collapsed = ref(false)

const categories = ref<Category[]>([
  {
    id: 1,
    name: 'sample',
    expanded: true,
    links: [
      { id: 11, name: 'echo', url: '/basic/echo', method:'GET' , type:'rest'},
      { id: 12, name: 'ping', url: '/basic/ping', method:'GET' , type:'rest'},
      { id: 14, name: 'post', url: '/basic/post', method:'POST', type:'rest' },
      { id: 13, name: 'rand/thing', url: '/basic/rand-thing',method:'GET', type:'rest' },
      { id: 15, name: 'jsonplaceholder', url: '/basic/json-placeholder', method:'query' , type:'graphql'},
    ],
  },
  // {
  //   id: 2,
  //   name: 'test',
  //   expanded: true,
  //   links: [
  //     { id: 21, name: '项目 A', url: '#project-a' },
  //     { id: 22, name: '项目 B', url: '#project-b' },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: 'graphql',
  //   expanded: true,
  //   links: [
  //     { id: 31, name: '个人信息', url: '#profile' },
  //     { id: 32, name: '偏好设置', url: '#preferences' },
  //   ],
  // },
])

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