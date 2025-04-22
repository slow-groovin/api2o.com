<script setup lang="ts">
import { useAsyncData, useHead, useRoute } from "#app";
import { queryCollection, useI18n } from "#imports";
import { Pagination, PaginationEllipsis, PaginationList, PaginationListItem } from "~/components/ui/pagination";
import BlogTimeLine from "./BlogTimeLine.vue";


const DEFAULT_PAGE_SIZE = 20
const { locale, t } = useI18n()

const props = defineProps<{ pageNo: number }>()
const { params } = useRoute()


useHead({
  title: t('blog')
})

const pageNo = props.pageNo

const skip = (pageNo - 1) * DEFAULT_PAGE_SIZE

const { data } = await useAsyncData('blog', () => queryCollection('blog')
  .where('_locale', '=', locale.value)
  .select('_id', 'title', 'date', 'tags')
  .order('date', 'DESC')
  .skip(skip)
  .limit(DEFAULT_PAGE_SIZE)
  .all())
const { data: count } = await useAsyncData('blog-count', () => queryCollection('blog')
  .where('_locale', '=', locale.value)
  .count()
)

</script>

<template>
  <div class="flex flex-col lg:container gap-y-4">
    <h1 class="text-3xl font-bold mb-1">
      📰{{ t('timeline') }}</h1>
    <BlogTimeLine v-if="data" :docs="data" />

    <Pagination class="" v-slot="{ page }" v-if="count" :total="count" :items-per-page="DEFAULT_PAGE_SIZE"
      :sibling-count="1" show-edges :default-page="2" :page="pageNo">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <NuxtLink :to="`/${locale}/blog/pg${item.value}`">
              <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>

            </NuxtLink>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
      </PaginationList>
    </Pagination>
  </div>
</template>

<style scoped></style>