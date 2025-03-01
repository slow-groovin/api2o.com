<template>
  <div class="mr-2  flex flex-row justify-center max-lg:flex-col  gap-10 min-h-[50vh] ">
    <!--    parse column-->
    <div class="min-w-[26em]">
      <h1 class="text-2xl font-bold ">{{ i18nVal('title') }}</h1>
      <div class="m-1 flex gap-2">
        <!--            <UncompletedBadge/>-->
        <OfflineBadge/>
      </div>
      <div class="font-extralight italic text-gray-600 dark:text-gray-200 max-w-[16em] mb-4">
        {{ i18nVal('description') }}
      </div>
      <div v-if="errorHint" class="text-red-500">
        {{ errorHint }}
      </div>
      <input
          v-model.trim="inputId"
          type="text"
          :placeholder="i18nVal('placeholder')"
          class="border p-2 rounded w-full"
      />
      <button @click="doParseObjectId" class="mt-4 bg-blue-500 text-white p-2 rounded w-full">
        {{ i18nVal('doParse') }}
      </button>
      <!--      parsed result part-->
      <div class="mt-4  p-2  rounded ring-2">
        <h2 class="text-lg font-semibold border-b-2">{{ i18nVal('result') }}: {{ lastParsedId }}</h2>
        <table>
          <tbody>

          <tr class=" rounded font-bold  border-2 text-primary text-2xl">
            <td class="p-2 pr-0">{{ timestampPart.padStart(8, '_') }}，</td>
            <td class="p-2 pr-0">{{ randomPart.padStart(10, '_') }}，</td>
            <td class="p-2 pr-0">{{ counterPart.padStart(6, '_') }}</td>
          </tr>
          <tr class="font-extralight text-sm  text-center  border-b">
            <td class="border-r">8Hex, 4Bytes</td>
            <td class="border-r text-wrap min-w-0">10Hex, 5Bytes</td>
            <td>6Hex, 3Bytes</td>
          </tr>

          
          <tr class=" text-center  border-b">
            <td class="border-r">↑{{ i18nVal('timestampPart') }}</td>
            <td class="border-r text-wrap min-w-0">↑{{ i18nVal('randomPart') }}</td>
            <td>↑{{ i18nVal('counterPart') }}</td>
          </tr>

          </tbody>
        </table>
        <div class="border-y  font-bold w-full text-center">
          <div class="border-y">{{ parsedDate.getTime() }}</div>
          <div class="border-y">{{ parsedDate.toLocaleString() }}</div>
        </div>
      </div>

    </div>
    <!--    history column-->
    <ClientOnly>
      <div class="border flex flex-col relative text-nowrap justify-self-end">
        <h1 class="flex items-end text-2xl">
          {{ i18nVal('history') }}
          <button class="hover:bg-muted block ml-1 rounded border-4"
                  @click="clearHistory">
            <Icon name="icon-park-outline:clear" class="text-muted-foreground block"/>
          </button>

          <button class=" block ml-1 rounded border-4"
                  :class="{
                    'bg-primary/50':showHistoryDate
                  }"
                  @click="showHistoryDate=!showHistoryDate">
            <Icon name="ri:time-line" class="block"

            />
          </button>
        </h1>
        <span v-if="copied" class="absolute top-0 right-0 w-fit p-2 border-l-2  border-blue-600 bg-neutral-100">
            Copy Success!
          </span>
        <div>
          <div class="my-4 ring-1 ring-primary flex flex-row" v-for="(item,index) in parsedHistories">
            <div class="flex flex-col">
              <div class="border text-primary">
                {{ item.timestamp }}, {{ item.random }}, {{ item.counter }}
              </div>
              <div class="border" v-show="showHistoryDate">
                {{ item.date.getTime() }} > {{ item.date.toLocaleString() }}
              </div>
            </div>
            <div class="flex flex-row items-center w-fit ml-1 border-l-4 gap-x-2">
              <button class="hover:bg-muted "
                      @click="deleteHistoryAt(index)">
                <Icon name="mdi:delete" mode="svg" class="text-muted-foreground h-8 w-8 rounded border"/>
              </button>

              <button class="hover:bg-muted "
                      @click="copy(item.value)">
                <Icon name="ph:copy" class="text-muted-foreground  h-8 w-8 rounded border" mode="svg"/>
              </button>
            </div>
          </div>

        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useClipboard, useLocalStorage} from "@vueuse/core";
import OfflineBadge from "~/components/hint/badge/OfflineBadge.vue";
import { useI18n, useSeoMeta } from '#imports';


const {t} = useI18n()
const i18nVal = (subKey: string) => t('tools.object-id-parser.' + subKey)
useSeoMeta({
  title: i18nVal('title'),
  description: i18nVal('description'),
})

const histories = useLocalStorage<string[]>('objectIDParse-histories', [])
const inputId = useLocalStorage('objectIDParse-defaultId', '65000000xxxxxxxxxx000001')
const lastParsedId = ref('')
const errorHint = ref<string | undefined>('')

const timestampPart = ref('')
const randomPart = ref('')
const counterPart = ref('')
const parsedDate = ref<Date>(new Date(0))

const showHistoryDate = useLocalStorage('objectIDParse-showHistoryDate', true)
const {copy, copied} = useClipboard()

const doParseObjectId = () => {
  console.log('parse', inputId.value)
  if (inputId.value.length !== 24) {
    errorHint.value = i18nVal('inputNot24BitHint');
    return;
  }
  errorHint.value = undefined
  lastParsedId.value = inputId.value
  const parseResult = parseObjectId(inputId.value)
  timestampPart.value = parseResult!.timestamp
  randomPart.value = parseResult!.random
  counterPart.value = parseResult!.counter
  parsedDate.value = parseResult!.date

  //push to history
  if (histories.value[0] !== inputId.value) {
    histories.value.unshift(inputId.value)
  }
  if (histories.value.length > 10) {
    histories.value.pop()
  }
};

function parseObjectId(objectId: string) {
  if (objectId.length !== 24) {
    return;
  }
  return {
    value: objectId,
    timestamp: objectId.substring(0, 8),
    date: new Date(parseInt(objectId.substring(0, 8), 16) * 1000),
    random: objectId.substring(8, 18),
    counter: objectId.substring(18, 24)
  }
}

const parsedHistories = computed(() => {
  return histories.value.map(id => parseObjectId(id)).filter(v => !!v)
})

function deleteHistoryAt(index: number) {
  histories.value.splice(index, 1)
}

function clearHistory() {
  histories.value = []
}
</script>

<style scoped>
</style>
