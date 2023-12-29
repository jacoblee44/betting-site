<template>
  <li class="text-gray-700">
    <a
      href="https://horse24.com/en/auctions/details/verden-stallion-licensing-2023-dressage-stallions-307/lots/von-und-zu-dancier-3170"
      class="block hover:text-brown-600 hover:underline"
    >
      <div class="flex mb-2">
        <LotArrow />
        <div>
          <h5 class="text-lg font-bold line-clamp-2 overflow-hidden mb-1">Von Und Zu / Dancier</h5>
          <p class="text-sm mb-4">Verden Stallion Licensing 2023 - Dressage Stallions</p>
        </div>
      </div>
      <div class="relative pl-28">
        <div class="absolute left-0 top-0 w-26">
          <img
            src="https://horse24-medias.s3.amazonaws.com/prod_hannoveraner_cmy7a/lots/44197/conversions/lot-image_1697629839261_png-widget_thumb.jpg"
            class="w-full h-auto"
          />
        </div>
        <div class="grid grid-cols-2 gap-5 my-1">
          <div>
            <h5 class="font-semibold mb-1">Sire</h5>
            <p>Von Und Zu</p>
          </div>
          <div>
            <h5 class="font-semibold mb-1">Dam By</h5>
            <p>Dancier</p>
          </div>
        </div>
        <div class="flex items-center border-t border-gray-300 mt-2 pt-2 gap-8">
          <h3 class="font-bold text-xl">
            <span> € 38.000 </span>
          </h3>
          <div class="ml-auto">
            <div class="bg-primary-500 text-white text-sm font-semibold px-2 py-1 rounded">
              Local
            </div>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
import LotArrow from './LotArrow.vue';
</script>
