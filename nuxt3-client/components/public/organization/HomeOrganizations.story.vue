<template>
  <Story>
    <HomeOrganizations :organizations="organizations" />
  </Story>
</template>

<script setup lang="ts">
import HomeOrganizations from './HomeOrganizations.vue';

const organizations = [
  {
    name: 'Hannover',
    logo: 'https://horse24-medias.s3.amazonaws.com/prod_hannoveraner_cmy7a/sites/413/HAN_Logo_unten.png',
  },
  {
    name: 'Hannover',
    logo: 'https://dressage24.s3.amazonaws.com/horse24/sites/60/WESTF_Logo_red.png',
  },
  {
    name: 'Hannover',
    logo: 'https://dressage24.s3.amazonaws.com/horse24/sites/93/DSP_Logo_red_1.png',
  },
  {
    name: 'Hannover',
    logo: 'https://dressage24.s3.amazonaws.com/horse24/sites/721/HORSE24_logo.png',
  },
];
</script>
