<template>
  <div>
    <label :for="id" v-if="label" class="block text-sm font-medium leading-6 text-gray-900">{{
      label
    }}</label>
    <div class="mt-2">
      <input
        :id="id"
        type="text"
        v-model="value"
        :class="{
          'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            invalid,
        }"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <p v-if="invalid" :id="`${id}-error`" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import useUniqueId from '@/composables/sites/useUniqueId';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: String,
  invalid: Boolean,
  error: String,
});

const { id } = useUniqueId('input');
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
