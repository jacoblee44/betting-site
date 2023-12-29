<template>
  <div :style="themeVariables" class="my-card bg-[var(--primary-color)]">
    <div class="bg-[var(--primary-color-400)]">Child</div>
    My auction card
  </div>
</template>

<script setup lang="ts">
import { type AuctionTheme, type ColorShades, type Theme } from '~/interfaces/theme';

const props = defineProps({
  theme: {
    type: Object as PropType<Theme>,
    required: true,
  },
});

const { themeVariables } = useTheme(props.theme);
</script>

<style scoped>
.my-card {
  --auction-banner-color: #00ffff;
}
</style>
