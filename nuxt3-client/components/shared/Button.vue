<template>
  <div
    :class="[
      'flex items-center justify-center rounded-[3px] cursor-pointer transition transform duration-300 ease-in-out',
      'shadow-md hover:shadow-lg active:scale-95',
      buttonTheme,
      buttonClasses,
    ]"
    @click="handleClick"
  >
    <div class="font-bold text-base leading-6 tracking-[0.025em] select-none">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 150,
  },
  small: Boolean,
  disable: Boolean,
  loading: Boolean,
  primary: Boolean,
  secondary: Boolean,
  orange: Boolean,
});

const buttonTheme = computed(() => {
  if (props.secondary) {
    return 'bg-white hover:bg-neutral-100 text-black border-black border-[1px]';
  } else if (props.orange) {
    return 'bg-logo-accent-500 hover:bg-logo-accent-600 text-white';
  } else {
    return 'bg-black hover:bg-neutral-800 text-white';
  }
});

const buttonClasses = computed(() => ({
  'h-[45px]': !props.small,
  'h-[30px]': props.small,
  'opacity-50 cursor-not-allowed': props.disable,
  [`w-[${props.width}px]`]: true,
}));

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.disable && !props.loading) {
    emit('click');
  }
};
</script>
