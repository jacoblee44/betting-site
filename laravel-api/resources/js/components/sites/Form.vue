<template>
  <form
    @submit.prevent="submit"
    class="mt-6 rounded bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    :languages="languages"
  >
    <Alert
      :show="showAlert"
      :body="message.body"
      :heading="message.message"
      :type="message.type"
      @init-message="$emit('init-message')"
    />
    <div class="px-4 py-6 sm:p-8">
      <div class="max-w grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
        <div class="sm:col-span-4">
          <InputText
            label="Title"
            v-model="form.title"
            :invalid="form.invalid('title')"
            :error="form.errors.title"
          />
        </div>

        <div class="sm:col-span-4">
          <InputText
            label="Domain"
            v-model="form.domain"
            :invalid="form.invalid('domain')"
            :error="form.errors.domain"
          />
        </div>

        <div class="sm:col-span-4">
          <InputText
            label="Alternate Domain"
            v-model="form.alternate_domain"
            :invalid="form.invalid('alternate_domain')"
            :error="form.errors.alternate_domain"
          />
        </div>

        <div class="sm:col-span-6">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
            >Default Language</label
          >
          <div class="mt-2">
            <Select
              :items="languages"
              v-model="form.default_language"
              placeholder="Select Language"
              :invalid="form.invalid('default_language')"
              :error="form.errors.default_language"
            />
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
            >Other Languages</label
          >
          <div class="mt-2">
            <Select
              :items="languages"
              v-model="form.other_languages"
              multiple
              placeholder="Select Languages"
              :invalid="form.invalid('other_languages')"
              :error="form.errors.other_languages"
            />
          </div>
        </div>
        <div class="sm:col-span-6">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">
            Owner
          </label>
          <div class="mt-2">
            <Select
              :items="users"
              v-model="form.admin_id"
              placeholder="Select User"
              :invalid="form.invalid('admin_id')"
              :error="form.errors.admin_id"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
    >
      <button
        type="submit"
        :disabled="loading"
        :class="{
          'cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-800': loading,
        }"
        class="inline-flex items-center gap-1 rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
      >
        <loading v-if="loading"></loading>
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, PropType } from 'vue';
import Select from '@/components/Shared/Forms/Select.vue';
import InputText from '@/components/Shared/Forms/InputText.vue';
import Loading from '@/components/Shared/UI/Loading.vue';
import Alert from '@/components/Shared/UI/Alert.vue';
import { Message } from '../../interfaces/site';

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
  showAlert: {
    type: Boolean,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
    default: () => [],
  },
  users: {
    type: Array,
    default: () => [],
  },
});
</script>
