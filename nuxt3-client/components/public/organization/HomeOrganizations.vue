<template>
  <div class="my-8">
    <h2 class="text-2xl mb-4 text-center md:text-left">Organizations</h2>
    <div class="flex justify-center md:justify-start overflow-x-auto">
      <ul class="flex items-center justify-center md:justify-start">
        <li
          v-for="(organization, index) in organizations"
          :key="index"
          :class="{
            'md:pl-0': index === 0,
            'border-r border-gray-300': index !== organizations.length - 1,
            'pr-4': index !== organizations.length - 1,
          }"
          class="flex-none px-4 flex justify-center items-center max-w-[240px]"
        >
          <img
            :src="organization.logo"
            :alt="organization.name"
            class="h-auto max-w-[150px] md:max-w-full max-h-20 md:max-h-32"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { type Organization } from '../../../interfaces/site';

const props = defineProps({
  organizations: {
    type: Array as PropType<Organization[]>,
    required: true,
  },
});
</script>
