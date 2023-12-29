<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  dateString: {
    type: String,
    required: true,
  },
  dateTimeString: {
    type: String,
    required: true,
  },
});

const shouldSplit = computed(() => props.dateTimeString.length < 3);
const dateValue = computed(() =>
  shouldSplit.value ? props.dateTimeString[0] : props.dateTimeString[0] + props.dateTimeString[1],
);

const timeValue = computed(() =>
  shouldSplit.value
    ? props.dateTimeString[1]
    : ':' + props.dateTimeString[3] + props.dateTimeString[4] + 'am',
);
</script>

<template>
  <div class="flex justify-start text-left mb-1">
    {{ 'pages.auctions.card.bidupStartAt' }}
    <span class="ml-1 font-light">(CET)</span>
  </div>
  <div class="flex items-baseline justify-between">
    <div class="flex text-lg">
      <span>{{ dateString }}</span>
    </div>
    <div class="mx-2 border-r border-gray-300"></div>
    <div class="flex items-baseline">
      <div>
        {{ dateValue }}
      </div>
      <div class="font-light">
        {{ timeValue }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can still use scoped CSS or replace with Tailwind utility classes */
</style>
