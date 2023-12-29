<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { useForm } from 'laravel-precognition-vue';
import Form from './Form.vue';
import useSaveSite from '@/composables/sites/useSaveSite';
import { Site } from '../../interfaces/site';

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
    type: Object as PropType<Site>,
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

const defaultSite: Site = {
  domain: '',
  title: '',
  default_language: '',
  other_languages: [],
  admin_id: '',
  alternate_domain: '',
};

const form = useForm<Site>(props.method, props.url, defaultSite);

const { message, loading, submit, showAlert, initMessage } = useSaveSite(form);
</script>
