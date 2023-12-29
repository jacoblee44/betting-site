<template>
  <div>
    <div>
      <!-- This is the navigation menu -->
    </div>
    <div class="px-3 sm:px-5 md:px-[106px] mt-[75px] mb-[59px]">
      <div>
        <!-- Slider -->
      </div>
      <div class="mt-[59px]">
        <!--Organizations-->
      </div>
      <div class="flex gap-[60px] mt-[59px] lg:flex-row flex-col">
        <div class="md:basis-5/6">
          <slot />
        </div>
        <aside class="md:basis-1/6"></aside>
      </div>
      <div>
        <!-- Footer -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
