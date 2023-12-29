<template>
  <form @submit.prevent="submitForm" class="flex items-center pb-0">
    <input
      required
      type="email"
      name="email"
      v-model="email"
      class="flex-1 h-8 text-sm border rounded-none px-2 py-1 mt-1 mb-0"
      placeholder="Enter email to subscribe"
    />
    <button
      type="submit"
      class="h-8 bg-blue-500 border border-orange-500 rounded-none px-2 py-1 mt-1 mb-0 text-sm font-normal leading-none font-sans"
    >
      Subscribe
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');

function submitForm() {
  // Call API to verify email or dispatch action here
  console.log(email.value); // For now, it'll just log the email
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
