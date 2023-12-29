<template>
  <Form
    :form="form"
    :submit="submit"
    :loading="loading"
    :message="message"
    :show-alert="showAlert"
    :users="users"
    :languages="languages"
    @init-message="initMessage"
  />
</template>

<script setup lang="ts">
import { defineProps, defineComponent } from 'vue';
import { useForm } from 'laravel-precognition-vue';
import Form from './Form.vue';
import useSaveSite from '@/composables/sites/useSaveSite';

const props = defineProps({
  languages: {
    type: Array,
    required: true,
    default: () => [],
  },
  users: {
    type: Array,
    default: () => [],
  },
  site: {
    type: Object,
    required: true,
  },
  method: {
    type: String,
    required: false,
    default: 'post',
  },
  url: {
    type: String,
    required: true,
  },
});

const data = { ...props.site };

const { domain } = useSaveSite(data);
data.domain = domain;
const form = useForm<typeof data>(props.method, props.url, data);

const { message, loading, submit, showAlert, initMessage } = useSaveSite(form);
</script>
