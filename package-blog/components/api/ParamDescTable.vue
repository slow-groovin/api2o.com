<template>
  <div class="overflow-x-auto font-mono text-sm">
    <table class="border-collapse">
      <thead>
      <tr class="border-b">
        <th v-for="field in fieldOrder" :key="field" class="border border-foreground px-1">
          {{ field.charAt(0).toUpperCase() + field.slice(1) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.name" class="border-b">
        <td v-for="field in fieldOrder" :key="field" class="border border-foreground px-1" :class="{ 'text-gray-500': field === 'required' && !item.required }">
          <template v-if="field === 'required'">
            {{ item.required ? 'True' : 'False' }}
          </template>
          <template v-else-if="field === 'default'">
            {{ formatValue(item[field]) }}
          </template>
          <template v-else>
            {{ (item as any)[field] || '' }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type {ParamDesc} from "~/lib/models/api-request";



const props = defineProps<{
  items: ParamDesc[];
  fieldOrder?: string[];
}>()

const defaultFieldOrder = ['name', 'type', 'required', 'default', 'desc'];
const fieldOrder = props.fieldOrder || defaultFieldOrder;

function formatValue(value: any): string {
  if (value === undefined) return '-'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return value.toString()
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function formatOptions(options: any[] | undefined): string {
  if (!options || options.length === 0) return '-'
  return options.map(formatValue).join('|')
}
</script>

<style lang="postcss">
th, td {
  @apply border border-foreground px-1;
}
</style>