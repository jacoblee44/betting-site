<template>
  <div class="flex flex-col space-y-8 my-10">
    <h1>Heading 1 / bold / black / left</h1>
    <h2>Heading 2 / bold / black / left</h2>
    <div>
      <h3 class="h3-bold">Heading 3 / bold / black / left</h3>
      <h3 class="h3-regular">Heading 3 / regular / black / left</h3>
    </div>
    <h4>Heading 4 / bold / black / left</h4>
    <div>
      <h5 class="h5-bold">Heading 5 / bold / black / left</h5>
      <h5 class="h5-regular">Heading 5 / regular / black / left</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
});
</script>
