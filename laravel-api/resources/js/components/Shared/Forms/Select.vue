<template>
  <div>
    <Listbox v-model="selected" :multiple="multiple">
      <div class="relative mt-2">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <span class="block truncate">{{ currentValue || placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="item in items"
              :key="item.id"
              :value="item.id"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                ]"
              >
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ item.title }}
                </span>

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-indigo-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <span v-if="invalid" class="mt-2 text-sm text-red-600">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';

interface Item {
  id: string;
  title: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    required: true,
  },
  placeholder: String,
  invalid: Boolean,
  error: String,
  items: {
    type: Array as () => Item[],
    required: true,
    default: () => [],
  },
  multiple: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const selected = computed<string | string[]>({
  get() {
    return props.modelValue;
  },
  set(value) {
    let selectedValue = value;
    if (props.multiple) {
      selectedValue = Array.isArray(value) ? value : [value];
    }
    emit('update:modelValue', selectedValue);
  },
});

const currentValue = computed<string | null>(() => {
  if (props.multiple) {
    return props.items
      .filter((item) => selected.value.includes(item.id))
      .map((el) => el.title)
      .join(', ');
  }
  const selectedValue = props.items.find((item) => item.id === selected.value);
  return selectedValue ? selectedValue.title : null;
});
</script>
