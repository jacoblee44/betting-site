<template>
  <Story title="Design System/Base Components/Button">
    <Button
      :primary="primary"
      :secondary="secondary"
      :orange="orange"
      :disable="disable"
      :flat="flat"
      :loading="loading"
      :small="small"
      :width="width"
    >
      {{ label }}
    </Button>
  </Story>
</template>

<script lang="ts" setup>
import Button from './Button.vue';

const disable = false;
const flat = false;
const label = 'Submit';
const loading = false;
const small = false;
const width = 150;
const primary = true;
const secondary = false;
const orange = false;
</script>
