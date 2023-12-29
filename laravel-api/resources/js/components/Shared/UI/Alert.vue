<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon
                  v-if="type === 'success'"
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
                <CheckCircleIcon
                  v-if="type === 'danger'"
                  class="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ heading }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ body }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="$emit('init-message')"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import CheckCircleIcon from '@/components/Shared/Icons/CheckCircleIcon.vue';

const emit = defineEmits(['init-message']);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    default: '',
  },
});

watch(
  () => props.show,
  (newValue, oldValue) => {
    setTimeout(() => emit('init-message'), 5000);
  },
);
</script>
