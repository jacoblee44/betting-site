<template>
  <div>
    <div>
      <h1 class="text-[#3D3D3D] text-[28px] tracking-0.84">Recommended for you</h1>
      <div
        class="mt-7 flex md:grid md:grid-cols-1 md2:grid-cols-2 lg:grid-cols-1 lg2:grid-cols-2 xl2:grid-cols-3 gap-3 overflow-x-scroll md:overflow-auto snap-x snap-mandatory"
      >
        <AuctionCard v-for="k in 6" :key="'auction-card' + k" />
      </div>
    </div>

    <div>
      <h1 class="text-[#3D3D3D] text-[28px] tracking-0.84">Running and upcoming auctions</h1>
      <div
        class="mt-7 flex md:grid md:grid-cols-1 md2:grid-cols-2 lg:grid-cols-1 lg2:grid-cols-2 xl2:grid-cols-3 gap-3 overflow-x-scroll md:overflow-auto snap-x snap-mandatory"
      >
        <AuctionCard v-for="k in 6" :key="'auction-card' + k" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionCard from '~/components/public/auction/AuctionCard.vue';

definePageMeta({
  layout: 'empty',
});

const t = (val: string) => val;
</script>
