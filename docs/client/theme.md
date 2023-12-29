# h24-theme

As each tenant of our platform can have different branding, we need to make it possible to style our website with different colors.

Here there are two scenarios:
1. Depending on the domain (e.g. https://onlineauction.westfalenpferde.de or https://horse24.com) with which the user visits the platform, the entire website is themed in a different way.
2. For some components on the page, for example an Auction card for the auction from a specific tenant, these components will always be themed in a particular way (which can differ from the rest of the page).

We implement theming by using CSS variables, and overwriting these variables for particular HTML elements or the entire page.

```html
<template>
  <div :style="style" class="bg-[var(--primary-color)]" />
</template>

<script setup lang="ts">
const { style } = useTheme(props.theme);
</script>
```