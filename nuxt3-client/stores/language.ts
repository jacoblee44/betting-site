// stores/counter.ts

import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'en',
  }),
  actions: {
    setLanguage(newLanguage: string) {
      this.language = newLanguage;
    },
  },
});
