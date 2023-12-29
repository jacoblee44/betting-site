<template>
  <div class="layout" :style="themeVariables">
    A *default* layout
    <button
      class="p-2 bg-red-400 inline-block rounded"
      @click="setColor('primaryColor', '#FF0000')"
    >
      Change to red color
    </button>
    <button
      class="p-2 bg-blue-400 inline-block rounded"
      @click="setColor('primaryColor', '#0000FF')"
    >
      Change to blue color
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type Theme } from '../interfaces/theme';

const colors: Theme = {
  primaryColor: '#00FF00',
  actionButtonColor: '',
  listingButtonColor: '',
  secondaryButtonColor: '',
  primaryLinksColor: '',
  secondaryLinksColor: '',
  successAlertColor: '',
  errorAlertColor: '',
  warningAlertColor: '',
  informationAlertColor: '',
};

const { setColor, themeVariables } = useTheme(colors);
</script>

<style lang="scss" scoped>
body {
  background-color: lightblue;
}
</style>
