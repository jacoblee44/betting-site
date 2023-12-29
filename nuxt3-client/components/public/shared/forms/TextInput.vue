<template>
  <div class="relative mb-4">
    <label v-if="label" :for="id" class="label-base">{{ label }}</label>
    <div class="flex items-center space-x-2">
      <slot name="prepend"></slot>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="internalValue"
        @focus="emitFocus"
        @blur="emitBlur"
        :class="['form-input', inputSizeClasses, inputStatusClasses]"
        :disabled="disabled"
      />
      <slot name="append"></slot>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="hint" class="hint-base">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, type PropType } from 'vue';
import { InputSize, InputState } from '@/interfaces/enums';

const props = defineProps({
  modelValue: {
    type: Object as PropType<string | number>,
    required: true,
  },
  type: { type: String, default: 'text' },
  placeholder: String,
  label: String,
  id: String,
  size: {
    type: String as PropType<InputSize>,
    default: InputSize.Medium,
    validator: (value: string): value is InputSize =>
      Object.values(InputSize).includes(value as InputSize),
  },
  state: {
    type: String as PropType<InputState>,
    default: InputState.Base,
    validator: (value: string): value is InputState =>
      Object.values(InputState).includes(value as InputState),
  },
  errorMessage: String,
  hint: String,
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

// Size-specific classes using @apply directive in the style block
const inputSizeClasses = computed(() => ({
  'input-sm': props.size === InputSize.Small,
  'input-md': props.size === InputSize.Medium,
  'input-lg': props.size === InputSize.Large,
}));

// State-specific classes using @apply directive in the style block
const inputStatusClasses = computed(() => ({
  'input-error': props.state === InputState.Error,
  'input-success': props.state === InputState.Success,
  'input-warning': props.state === InputState.Warning,
  'input-base border-base': !props.state || props.state === InputState.Base,
}));

function emitFocus(event: Event) {
  emit('focus', event);
}

function emitBlur(event: Event) {
  emit('blur', event);
}
</script>

<style scoped>
/* Base styling for the input field */
.form-input {
  @apply block w-full bg-slate-50 focus:outline-none transition-colors duration-300 ease-in-out rounded-md;
}

.border-base {
  @apply border rounded-md focus:border-2 border-gray-200;
}

/* Size-specific classes */
.input-sm {
  @apply text-xs px-2 py-1;
}

.input-md {
  @apply text-sm px-3 py-2;
}

.input-lg {
  @apply text-lg px-4 py-3;
}

/* State-specific classes */
.input-error {
  @apply bg-red-50 border-2 border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500;
}

.input-success {
  @apply bg-green-50 border-2 border-green-500 text-green-900 placeholder-green-300 focus:ring-green-500 focus:border-green-500;
}

.input-warning {
  @apply bg-yellow-50 border-2 border-yellow-500 text-yellow-900 placeholder-yellow-300 focus:ring-yellow-500 focus:border-yellow-500;
}

.input-base {
  @apply focus:border-black focus:ring-gray-200 focus:ring focus:ring-opacity-50 shadow-inner disabled:opacity-50;
}

/* Label base class */
.label-base {
  @apply block mb-2 font-medium text-gray-700;
}

/* Hint base class */
.hint-base {
  @apply text-sm mt-1;
}

/* Error message styling */
.error-message {
  @apply text-red-500 text-sm mt-2;
}
</style>
