<script setup lang="ts">
import { navigateTo } from "#app";
import { useLocalePath } from '#imports';
const localePath = useLocalePath()
await navigateTo(localePath('/api/random/thing'), { redirectCode: 301 }) 
</script>