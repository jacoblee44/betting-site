import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { parse } from '@vue/compiler-sfc';
import { extractCss } from './css-extractor';
import cheerio from 'cheerio';
import { gptRewriteCss } from './css-rule-gpt';

export async function extractComponent(
  filePath: string,
  newComponentName: string,
  lineNumber: number,
): Promise<void> {
  // Step 1: Read the Vue 3 SFC file
  const fileContent = await fs.readFile(filePath, 'utf-8');

  // Step 2: Parse the SFC using @vue/compiler-sfc
  const sfcDescriptor = parse(fileContent).descriptor;

  if (!sfcDescriptor.template) {
    throw new Error('No template found in the Vue SFC');
  }

  const originalHtml = sfcDescriptor.template.content;

  // Assuming CSS is in the first style block (adjust as needed)
  const css = sfcDescriptor.styles.length ? sfcDescriptor.styles[0].content : '';

  // Load the original HTML into cheerio
  const $ = cheerio.load(originalHtml);

  // Identify the element at the given line number
  const targetElement = $(`*:nth-child(${lineNumber})`);

  // Step 2: Use the given function to extract necessary CSS
  const { extractedCss, extractedHtml } = extractCss(css, originalHtml, lineNumber);

  // Step 4: Create a new Vue component with the extracted HTML and CSS
  const newComponentContent = `
<template>
${extractedHtml}
</template>

<script lang="ts" setup>
</script>

<style scoped>
${extractedCss}
</style>
  `;

  // Step 6: Write the updated Vue file and the new component to disk
  const newComponentPath = join(dirname(filePath), `${newComponentName}.vue`);
  await Promise.all([fs.writeFile(newComponentPath, newComponentContent)]);
}
