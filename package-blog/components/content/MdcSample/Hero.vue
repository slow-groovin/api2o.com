<template>
  <section class="my-16 ring">
    <h1 class="text-4xl"><slot /></h1>
    <hr/>
    <section class="border ">
      <slot name="content"/>
    </section>
    <section class="border">
      <slot name="description"/>
    </section>
    <section class="border">
<!--      <ContentSlot :use="$slots.code" unwrap="p" />-->
    </section>
  </section>
</template>
<script setup lang="ts">
</script>