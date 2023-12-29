<template>
  <div class="bg-primary-color">
    This is index
    <MyAuctionCard :theme="redTheme" />
    <MyAuctionCard :theme="theme" />
  </div>
</template>

<script setup lang="ts">
import type { ColorShades, Theme } from '~/interfaces/theme';

// Function to generate shades around a given '500' hex color value
function generateColorShades(base500Color: string): ColorShades {
  // A simple function to lighten or darken a hex color (placeholder logic)
  const adjustColor = (color: string, amount: number): string => {
    // This is a very simplistic adjustment and not color accurate
    let hex = parseInt(color.slice(1), 16);
    let r = (hex >> 16) + amount;
    let g = ((hex >> 8) & 0x00ff) + amount;
    let b = (hex & 0x0000ff) + amount;

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  return {
    '50': adjustColor(base500Color, 180),
    '100': adjustColor(base500Color, 150),
    '200': adjustColor(base500Color, 120),
    '300': adjustColor(base500Color, 90),
    '400': adjustColor(base500Color, 60),
    '500': base500Color, // Base color
    '600': adjustColor(base500Color, -60),
    '700': adjustColor(base500Color, -90),
    '800': adjustColor(base500Color, -120),
    '900': adjustColor(base500Color, -150),
    '950': adjustColor(base500Color, -180),
  };
}

// Generate the theme object
const theme: Theme = {
  primaryColor: generateColorShades('#337ab7'),
  actionButtonColor: generateColorShades('#5cb85c'),
  listingButtonColor: generateColorShades('#f0ad4e'),
  secondaryButtonColor: generateColorShades('#d9534f'),
  primaryLinksColor: generateColorShades('#0275d8'),
  secondaryLinksColor: generateColorShades('#5bc0de'),
  successAlertColor: generateColorShades('#5cb85c'),
  errorAlertColor: generateColorShades('#d9534f'),
  warningAlertColor: generateColorShades('#f0ad4e'),
  informationAlertColor: generateColorShades('#5bc0de'),
};

const redTheme = {
  ...theme,
  primaryColor: generateColorShades('#7a3333'),
};
</script>
