<script setup lang="ts">

import {DropdownMenu} from "~/components/ui/dropdown-menu";
import {useI18n,} from "vue-i18n";
import { useSwitchLocalePath } from "#imports";
const {availableLocales, locale, t} = useI18n()
const switchLocalePath = useSwitchLocalePath()
import { Icon } from "#components";
// console.log('LangSwitchButton', availableLocales, locale.value, switchLocalePath('zh'))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="w-8 h-8 p-1 ring-2 ring-ring">
      <Button variant="outline" class="bg-transparent">
        <Icon name="mdi:language" size="1em" mode="svg"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-fit min-w-fit">
      <DropdownMenuLabel>{{ t('lang') }}</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuRadioGroup v-model="locale">
        <NuxtLink v-for="localeItem in availableLocales" :to="switchLocalePath(localeItem)">
          <DropdownMenuRadioItem :value="localeItem">
            {{ localeItem }}
          </DropdownMenuRadioItem>
        </NuxtLink>


      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>

</template>

<style scoped>

</style>