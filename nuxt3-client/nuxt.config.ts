// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: true,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-headlessui', '@nuxtjs/google-fonts'],
  eslint: {
    failOnError: true,
    failOnWarning: true,
  },
  googleFonts: { families: { 'Source+Sans+Pro': true } },
});
