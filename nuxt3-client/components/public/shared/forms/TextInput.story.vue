<template>
  <Story>
    <TextInput
      v-model="value"
      :label="label"
      :placeholder="placeholder"
      :type="type"
      :size="size"
      :state="state"
      :disabled="disabled"
      :hint="hint"
      :errorMessage="errorMessage"
    >
    </TextInput>
  </Story>
</template>

<script setup lang="ts">
import { InputSize, InputState } from '~/interfaces/enums';
import TextInput from './TextInput.vue';

const value = '';
const label = 'Email Address';
const placeholder = 'Enter your email';
const type = 'email';
const size = InputSize.Medium;
const state = InputState.Base;
const disabled = false;
const hint = 'A hint for the input';
const errorMessage = '';
</script>
