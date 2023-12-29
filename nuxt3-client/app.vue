<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { language, setLanguage } = useLanguage();

function changeLanguageButton() {
  setLanguage('de');
}
</script>
